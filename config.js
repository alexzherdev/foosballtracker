'use strict';


const config = {
  development: {
    host: 'http://localhost',
    port: 8989
  },

  test: {
    host: 'http://localhost',
    port: 8988
  },

  staging: {
    host: 'https://ftstaging.herokuapp.com',
    port: process.env.PORT || 3000
  }
};

['development', 'test'].forEach((e) => {
  config[e].url = `${config[e].host}:${config[e].port}`;
});

config.staging.url = config.staging.host;

let env;
if (typeof window !== 'undefined') {
  env = window.env;
} else if (typeof process !== 'undefined') {
  env = process.env.NODE_ENV;
}
env = env || 'development';

module.exports = config[env];
