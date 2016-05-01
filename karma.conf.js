const RewireWebpackPlugin = require("rewire-webpack");
const path = require('path');

module.exports = function(config) {
  config.set({
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    files: [
      { pattern: 'tests.webpack.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      node: {
        fs: 'empty',
        net: 'empty'
      },

      isparta: {
          embedSource: true,
          noAutoWrap: true
      },

      module: {
        noParse: [
            /node_modules\/sinon/
        ],
        loaders: [
          {
            test: /\.js$/,
            exclude: [
              path.resolve('node_modules/')
            ],
            loader: 'babel-loader',
            query: { presets: ['es2015'] }
          },
          // Instrument source files with isparta-loader (will perform babel transpiling).
          {
            test: /\.js$/,
            include: [
              path.resolve('src/')
            ],
            loader: 'isparta'
          }
        ]
      },
      plugins: [new RewireWebpackPlugin()],
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/ui',
      reporters: [
        { type: 'lcov', subdir: 'lcov-report' },
        { type: 'json', subdir: './', file: 'coverage.json' }
      ],
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta'
      }
    }
  });
};
