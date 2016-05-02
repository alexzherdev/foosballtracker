import k from 'knex';
import knexCleaner from 'knex-cleaner';
import requireDir from 'require-dir';

import config from '../../../../knexfile';

let knex = k(config.test);

beforeEach((done) => {
  knexCleaner.clean(knex, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] })
    .then(() => knex.migrate.latest())
    .then(done);
});

requireDir('../../controllers', { recurse: true });
requireDir('../../models', { recurse: true });
