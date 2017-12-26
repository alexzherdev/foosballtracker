"use strict";

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var gutil = require('gulp-util');
var htmlreplace = require('gulp-html-replace');
var cleanCss = require('gulp-clean-css');
var argv = require('yargs').argv;


var config = {
  paths: {
    html: './src/**/*.html',
    jsDirs: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap/dist/js/npm.js',
      './',
      './src/js/',
      './src/js/actions/',
      './src/js/components/',
      './src/js/constants/'
    ],
    js: './src/**/*.js',
    mainJs: './src/js/main.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/toastr/build/toastr.min.css'
    ],
    fonts: [
      'node_modules/bootstrap/dist/fonts/*'
    ],
    scss: [
      'src/css/*.scss'
    ],
    dist: process.env.NODE_ENV === 'production' ? './build' : './dist'
  }
};

var lint = function(files) {
  gutil.log('linting', files);
  return gulp.src(files)
    .pipe(eslint({ config: 'eslint.config.json' }))
    .pipe(eslint.format())
    .pipe(gulpif(!argv.watch, eslint.failAfterError()));
};

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(htmlreplace({
      'setup-env': {
        src: process.env.NODE_ENV || 'development',
        tpl: '<script type="text/javascript">window.env="%s";</script>'
      }
    }))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('fonts', function() {
  gulp.src(config.paths.fonts)
    .pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('sass', function() {
  merge(
    gulp.src(config.paths.css)
      .pipe(sourcemaps.init()),
    gulp.src(config.paths.scss)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
  )
    .pipe(concat('application.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('sass-production', function() {
  merge(
    gulp.src(config.paths.css),
    gulp.src(config.paths.scss)
      .pipe(sass().on('error', sass.logError))
  )
    .pipe(concat('application.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest(config.paths.dist + '/css'));
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

  if (argv.watch) {
    var watcher = watchify(bundler);
  }

  function bundle(changedFiles) {
    var bundleStream = bundler
        .transform(babelify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('application.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'));
    if (changedFiles) {
      var lintStream = lint(changedFiles);
      return merge(bundleStream, lintStream);
    }

    return bundleStream;
  }

  bundler.on('update', bundle);

  return bundle();
});

gulp.task('lint', function() {
  return lint(config.paths.js);
});

gulp.task('default', ['lint', 'html', 'fonts', 'js', 'sass'], function() {
  if (argv.watch) {
    gulp.watch(config.paths.scss, ['sass']);
    gulp.watch(config.paths.js, ['lint']);
  }
});

gulp.task('build', ['html', 'fonts', 'sass-production'], function() {
  var bundler = browserify({
    paths: config.paths.jsDirs,
    entries: [config.paths.mainJs],
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  return bundler
    .transform(babelify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist + '/scripts'));
});
