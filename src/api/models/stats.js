'use strict';

const Promise = require('bluebird');

const db = require('../db');
const Match = require('./match');

let _returnResults = ([matchesPlayed, bestWinRate, avgMatchesDaily]) => {
  return { matchesPlayed, bestWinRate, avgMatchesDaily };
};

let _getOverallStats = () => {
  return Promise.all([
    Match.count(),
    _getBestWinRate(),
    _getAvgMatchesDaily()
  ]).then(_returnResults);
};

let _getMatchTypeStats = (matchType) => {
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

let _getBestWinRate = (matchType) => {
  let knex = db.knex;
  // let wonMatches =
  //   db.knex.from('teams as t').select(knex.raw('IF(team1_score IS NULL, 0, COUNT(t.id)) AS won'), 't.id')
  //     .leftOuterJoin('matches as m', function() { this.on(knex.raw('t.id = m.team1_id and m.team1_score = 10')).orOn(knex.raw('t.id = m.team2_id and m.team2_score = 10')); })
  //     .groupByRaw('t.id').as('w');
  // let lostMatches =
  //   db.knex.from('teams as t').select(knex.raw('IF(team1_score IS NULL, 0, COUNT(t.id)) AS won'), 't.id')
  //     .leftOuterJoin('matches as m', function() { this.on(knex.raw('t.id = m.team1_id and m.team1_score < 10')).orOn(knex.raw('t.id = m.team2_id and m.team2_score < 10')); })
  //     .groupByRaw('t.id').as('l');
  // let rates = knex.from(wonMatches.innerJoin(lostMatches, function() { this.on('w.id', '=', 'l.id'); })).select('w.id');
  return knex.raw(
    `select IF(won+lost = 0, 0, won/(won+lost)) as rate, won+lost as total, w.id, w.name from \
      (select IF(team1_score IS NULL, 0, count(t.id)) as won, t.id, t.name from teams t \
        left outer join matches m \
        on ${ matchType ? "match_type = ? and " : ""}((t.id = m.team1_id and team1_score = ${ Match.winPoints }) or (t.id = m.team2_id and team2_score = ${ Match.winPoints })) group by t.id) w \
        \
      inner join \
        \
      (select IF(team1_score IS NULL, 0, count(t.id)) as lost, t.id, t.name from teams t \
        left outer join matches m \
        on ${ matchType ? "match_type = ? and " : ""}((t.id = m.team1_id and team1_score < ${ Match.winPoints }) or (t.id = m.team2_id and team2_score < ${ Match.winPoints })) group by t.id) l \
      on w.id = l.id;`,
      matchType ? [matchType, matchType] : []
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

const Stats = {
  getSummary() {
    return Promise.all([
      _getOverallStats(),
      _getMatchTypeStats('2v2'),
      _getMatchTypeStats('1v1')
    ]).then(([overall, twovtwo, onevone]) => {
      return {
        overall,
        twovtwo,
        onevone
      };
    });
  }
};

module.exports = Stats;
