const RewireWebpackPlugin = require("rewire-webpack");

module.exports = function(config) {
  config.set({
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
        plugins: ['babel-runtime']
      },
      plugins: [new RewireWebpackPlugin()],
      watch: true
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
