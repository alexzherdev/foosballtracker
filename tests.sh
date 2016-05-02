echo "Running UI tests..."
./node_modules/karma/bin/karma start &
echo "Running API tests..."
./node_modules/.bin/babel-node ./node_modules/isparta/lib/cli cover src/api/spec/support/run.js --dir ./coverage/api/ -x secrets.js &
wait
echo "Combining reports..."
./node_modules/.bin/babel-node ./node_modules/istanbul/lib/cli report --dir ./coverage/combined --include **/coverage.json lcov
