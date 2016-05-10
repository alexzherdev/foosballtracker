'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const db = require('../db');
const Match = require('./match');

const knex = db.knex;

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
  return db.knex.select(db.knex.raw('matches_played / DATEDIFF(NOW(), earliest_date) as avg_daily'))
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

let _getAggForWins = (selects, matchType) => {
  return _getAgg(
    knex.raw('((t.id = m.team1_id and m.team1_score = ?) or (t.id = m.team2_id and m.team2_score = ?))', [Match.winPoints, Match.winPoints]),
    selects,
    matchType
  );
};

let _getAggForLosses = (selects, matchType) => {
  return _getAgg(
    knex.raw('((t.id = m.team1_id and m.team1_score < ?) or (t.id = m.team2_id and m.team2_score < ?))', [Match.winPoints, Match.winPoints]),
    selects,
    matchType
  );
};

let _getWinLossAgg = (selects, matchType) => {
  return knex
    .select(...selects)
    .from(knex.raw(`(${_getAggForWins([knex.raw('IF(team1_score IS NULL, 0, count(t.id)) as won'), 't.id', 't.name',
      knex.raw('coalesce(sum(IF(team1_id = t.id, team1_score, team2_score)), 0) as goals_for_w'),
      knex.raw('coalesce(sum(IF(team1_id = t.id, team2_score, team1_score)), 0) as goals_against_w'),
      knex.raw('sum(IF(t.id = m.team1_id, team2_score = 0, team1_score = 0)) as clean_sheets')], matchType)}) w`))
      .innerJoin(knex.raw(`(${_getAggForLosses([knex.raw('IF(team1_score IS NULL, 0, count(t.id)) as lost'), 't.id', 't.name',
        knex.raw('coalesce(sum(IF(team1_id = t.id, team1_score, team2_score)), 0) as goals_for_l'),
        knex.raw('coalesce(sum(IF(team1_id = t.id, team2_score, team1_score)), 0) as goals_against_l')], matchType)}) l`),
        function() { this.on(knex.raw('w.id = l.id')); })
      .whereRaw('won + lost > 0')
      .orderBy('won', 'desc')
    .toString();
};

let _getBestWinRate = (matchType) => {
  return knex.raw(
    _getWinLossAgg([knex.raw('IF(won+lost = 0, 0, won/(won+lost)) as rate'), knex.raw('won+lost as total'), 'w.id', 'w.name'], matchType)
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

let _getMatchTypeDetailStats = (matchType) => {
  return knex.raw(
    _getWinLossAgg([
      knex.raw('(goals_for_w + goals_for_l) as goals_for'),
      knex.raw('(goals_against_w + goals_against_l) as goals_against'),
      knex.raw('(goals_for_w + goals_for_l - goals_against_w - goals_against_l) as goals_difference'),
      'w.id',
      'w.name',
      knex.raw('coalesce(w.clean_sheets, 0) as clean_sheets'),
      'won',
      'lost',
      knex.raw('(won + lost) as played')
    ], matchType)
  ).then((results) => results[0]);
}

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
  }
};

module.exports = Stats;
