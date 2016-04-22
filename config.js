'use strict';


const config = {
  development: {
    host: 'http://localhost',
    uiPort: 8989,
    apiPort: 7878
  },

  staging: {

  }
}

let env = process.env.NODE_ENV || 'development';

module.exports = config[env];