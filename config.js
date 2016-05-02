'use strict';


const config = {
  development: {
    host: 'http://localhost',
    uiPort: 8989,
    apiPort: 7878
  },

  test: {
    host: 'http://localhost',
    apiPort: 7879
  },

  staging: {

  }
}

let env = process.env.NODE_ENV || 'development';

module.exports = config[env];
