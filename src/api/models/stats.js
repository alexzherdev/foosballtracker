'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const db = require('../db');
const Match = require('./match');
require('./team');
const Team = db.model('Team');

const knex = db.knex;

const RECENT_MATCHES_COUNT = 10;

let _returnResults = ([matchesPlayed, bestWinRate, avgMatchesDaily]) => {
  return { matchesPlayed, bestWinRate, avgMatchesDaily };
};

let _getOverallStatsSummary = () => {
  return Promise.all([
    Match.count(),
    _getBestWinRate(),
    _getAvgMatchesDaily()
  ]).then(_returnResults);
};

let _getMatchTypeStatsSummary = (matchType) => {
  return Promise.all([
    Match.where('match_type', matchType).count(),
    _getBestWinRate(matchType),
    _getAvgMatchesDaily(matchType)
  ]).then(_returnResults);
};

let _getAvgMatchesDaily = (matchType) => {
  let matchesPlayed = Match.query().min('created_at as earliest_date').count('id as matches_played').as('m');
  if (matchType) {
    matchesPlayed = matchesPlayed.where('match_type', matchType);
  }
  return db.knex.select(db.knex.raw('matches_played / DATEDIFF(DATE_ADD(NOW(), interval 1 day), earliest_date) as avg_daily'))
    .from(matchesPlayed)
    .then((results) => results[0].avg_daily);
};

let _getAgg = (joinCondition, selects, matchType) => {
  return knex
    .from('teams as t')
    .leftOuterJoin('matches as m', function() {
      this.on(joinCondition);
      if (matchType) {
        this.andOn(knex.raw('match_type = ?', [matchType]));
      }
    })
    .groupByRaw('t.id')
    .select(...selects)
    .toString();
};

let _getWinLossAgg = (selects, matchType) => {
  return knex
    .select(...selects)
    .from(knex.raw(`(${_getAgg(
      knex.raw('(t.id = m.team1_id or t.id = m.team2_id)'),
      ['t.id', 't.name',
        knex.raw('SUM(IF(team1_id = t.id, team1_score, team2_score)) as goals_for'),
        knex.raw('SUM(IF(team1_id = t.id, team2_score, team1_score)) as goals_against'),
        knex.raw('SUM(IF(team1_id = t.id, team1_score - team2_score, team2_score - team1_score)) as goals_difference'),
        knex.raw('SUM(IF(team1_id = t.id, team2_score = 0, team1_score = 0)) as clean_sheets'),
        knex.raw('SUM(IF(team1_id = t.id, team1_score = 0, team2_score = 0)) as failed_to_score'),
        knex.raw('SUM(IF(team1_id = t.id, team1_score = 10, team2_score = 10)) as won'),
        knex.raw('SUM(IF(team1_id = t.id, team1_score < 10, team2_score < 10)) as lost'),
        knex.raw('COUNT(t.id) as played'),
        knex.raw('GROUP_CONCAT(IF(team1_id = t.id, IF(team1_score > team2_score, \'W\', \'L\'), IF(team2_score > team1_score, \'W\', \'L\')) ORDER BY m.created_at DESC SEPARATOR \'\') as form')
      ],
      matchType
    )}) agg`))
      .whereRaw('won + lost > 0')
      .orderBy('won', 'desc')
};

let _getBestWinRate = (matchType) => {
  return knex.raw(
    _getWinLossAgg([knex.raw('IF(won+lost = 0, 0, won/(won+lost)) as rate'), knex.raw('won+lost as total'), 'id', 'name'], matchType)
      .toString()
  ).then((results) => {
    return results[0].sort((a, b) => {
      if (a.rate === b.rate) {
        return b.total - a.total;
      } else {
        return b.rate - a.rate;
      }
    })[0];
  });
};

let _commonAggSelects = () => {
  return [
    'goals_for',
    'goals_against',
    'goals_difference',
    'id',
    'name',
    'clean_sheets',
    'failed_to_score',
    'won',
    'lost',
    'played',
    knex.raw('IF(won + lost = 0, \'n/a\', won / (won + lost)) as win_rate')
  ];
};

let _getMatchTypeDetailStats = (matchType) => {
  return knex.raw(
    _getWinLossAgg(_commonAggSelects(), matchType).toString()
  ).then((results) => results[0]);
};

let _getTeamStats = (teamId) => {
  let extractCurrentStreak = (form) => {
    let match;
    if (match = form.match(/^W+/)) {
      return { wins: match[0].length };
    } else {
      match = form.match(/^L+/);
      return { defeats: match[0].length };
    }
  };

  let extractLongestStreak = (form, char) => {
    let regex = new RegExp(`${char}+`, 'gi');
    let match = form.match(regex);
    if (!match) {
      return 0;
    }
    return _.maxBy(match, 'length').length;
  };

  return Team.forge({ id: teamId }).fetchWithPlayerCount().then((team) => {
    let matchType = (team.related('players').at(0).get('count') === 1 ? '1v1' : '2v2');
    return knex.raw(
      _getWinLossAgg(
        _commonAggSelects().concat([
          'form',
          knex.raw('goals_for/played as scored_per_match'),
          knex.raw('goals_against/played as conceded_per_match')
        ]), matchType
      ).where('id', '=', teamId).toString()
    );
  }).then((results) => {
    let result = results[0][0];
    let form = result.form;
    result.streaks = {
      current: extractCurrentStreak(form),
      longest: {
        wins: extractLongestStreak(form, 'W'),
        defeats: extractLongestStreak(form, 'L')
      }
    };

    return result;
  });
};

let _getRecentMatches = (teamId) => {
  return Team.collection().query((qb) => {
    qb
      .innerJoin('matches as m', function() {
        this.on(knex.raw('(teams.id = team1_id and team2_id = ?)', [teamId])).orOn(knex.raw('(teams.id = team2_id and team1_id = ?)', [teamId]))
      })
      .orderBy('m.created_at', 'desc')
      .limit(RECENT_MATCHES_COUNT)
      .select('m.created_at', 'm.team1_score', 'm.team2_score', 'm.team1_id', 'm.team2_id', 'm.match_type', 'teams.name')
  }).fetch();
};


const Stats = {
  getSummary() {
    return Promise.all([
      _getOverallStatsSummary(),
      _getMatchTypeStatsSummary('2v2'),
      _getMatchTypeStatsSummary('1v1')
    ]).then(([overall, twovtwo, onevone]) => ({ overall, twovtwo, onevone }));
  },

  getAll() {
    return Promise.all([
      _getMatchTypeDetailStats('2v2'),
      _getMatchTypeDetailStats('1v1')
    ]).then(([twovtwo, onevone]) => ({ twovtwo, onevone }));
  },

  getForTeam(teamId) {
    // wins, losses, last 5 games, GF, GA, GF/m, GA/m, clean sheets, winning streak, losing streak
    return Promise.all([
      new Team({ id: teamId }).fetch(),
      _getRecentMatches(teamId),
      _getTeamStats(teamId)
    ]).then(([team, scores, stats]) => ({ team, scores, stats }));
  }
};

module.exports = Stats;
