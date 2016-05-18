#!/bin/bash

echo "Running UI tests..."
./node_modules/karma/bin/karma start &
uiPid=$!

echo "Running API tests..."
./node_modules/.bin/babel-node ./node_modules/isparta/lib/cli cover ./src/api/spec/support/run.js --dir ./coverage/api/ -x secrets.js &
apiPid=$!

wait $uiPid
uiCode=$?

wait $apiPid
apiCode=$?

if [ $uiCode -ne 0 ] || [ $apiCode -ne 0 ]; then
  kill $uiPid &> /dev/null
  kill $apiPid &> /dev/null
  exit 1
fi

echo "Combining reports..."
./node_modules/.bin/babel-node ./node_modules/istanbul/lib/cli report --dir ./coverage/combined --include **/coverage.json lcov

# try to fix sed for OS X
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i .old -e 's?SF:'$(pwd)'/?SF:?g' coverage/combined/lcov.info
else
  sed -i -e 's?SF:'$(pwd)'/?SF:?g' coverage/combined/lcov.info
fi
