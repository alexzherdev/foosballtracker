#!/bin/bash

if [[ "$NODE_ENV" == "production" ]]; then
  echo "Running production server"
  node ./build/api/server.js
else
  nodemon --exec ./node_modules/.bin/babel-node -- ./src/api/server.js
fi
