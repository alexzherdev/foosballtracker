"use strict";

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var config = {
  paths: {
    html: './src/**/*.html',
    jsDirs: [
      './src/js/',
      './src/js/actions/',
      './src/js/components/',
      './src/js/constants/',
      './src/js/dispatchers/',
      './src/js/pages/',
      './src/js/stores/'
    ],
    js: './src/js/**/*.js',
    mainJs: './src/js/main.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist'
  }
};

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('application.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('js', function() {
  var bundler = browserify({
    paths: config.paths.jsDirs,
    entries: [config.paths.mainJs],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var watcher = watchify(bundler);

  function bundle() {
    bundler
      .transform(babelify, {
        presets: ['es2015', 'react', 'stage-0']
      })
      .bundle()
      .on('error', console.error.bind(console))
      .pipe(source('application.js'))
      .pipe(gulp.dest(config.paths.dist + '/scripts'));;
  }

  bundler.on('update', bundle);

  return bundle();
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(eslint({ config: 'eslint.config.json' }))
    .pipe(eslint.format());
});

gulp.task('default', ['html', 'lint', 'js', 'css']);