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
            query: { presets: ['es2015'], plugins: ['transform-class-properties'] }
          }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
