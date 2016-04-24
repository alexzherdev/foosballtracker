const RewireWebpackPlugin = require("rewire-webpack");

module.exports = function(config) {
  config.set({
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    files: [
      { pattern: 'tests.webpack.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    singleRun: true,
    webpack: {
      module: {
        noParse: [
            /node_modules\/sinon/,
        ],
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
        plugins: ['babel-runtime'],
        postLoaders: [{ //delays coverage til after tests are run, fixing transpiled source coverage error
          test: /\.js$/,
          exclude: /(test|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }]
      },
      plugins: [new RewireWebpackPlugin()],
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    }
  });
};
