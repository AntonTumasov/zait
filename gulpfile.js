'use strict';

const gulp = require('gulp'),
  babel = require('gulp-babel'),
  mocha = require('gulp-mocha'),
  istanbul = require('gulp-istanbul'),
  jshint = require('gulp-jshint'),
  jscpd = require('gulp-jscpd'),
  jscs = require('gulp-jscs'),
  jsdoc = require('gulp-jsdoc3'),
  //config
  paths = {
      from: ['src/**/*.js', 'app/*.js'],
      to: 'build/'
  };

gulp.task('lint', function () {
  return gulp.src(paths.from, {base: '.'})
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
    //.pipe(jshint.reporter('fail'));
});

gulp.task('jscpd', function () {
  return gulp.src(paths.from, {base: '.'})
    .pipe(jscpd());
});

gulp.task('jscs', function () {
  return gulp.src(paths.from, {base: '.'})
    .pipe(jscs({
      "errorCount": 20
    }))
    .pipe(jscs.reporter());
});

gulp.task('jsdoc', function () {
  const jsDocConf = require('./jsdocConf.json');
  
return gulp.src(paths.from, {base: '.', read: false})
    .pipe(jsdoc());
});

gulp.task('before-test', function () {
  return gulp.src(paths.from, {base: '.'})
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['before-test'],function () {
  return gulp.src('./test/*')
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 }}));
});

gulp.task('js', ['lint', 'jscpd', 'jscs'], function () {
  return gulp.src(paths.from, {base: '.'})
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.to));
});

gulp.task('build', ['test', 'js', 'jsdoc']);

gulp.task('default', ['js']);

gulp.task('watch', function () {
  gulp.watch(paths.from, ['js']);
});

function logger(err) {
  
  //Inspired by Vsevolod Rodionov(http://habrahabr.ru/users/Jabher/)
  console.log(
        [
            '',
            '=====================ERROR====================',
            '' + err.name + ' in ' + err.plugin + '',
            err.message,
            '==============================================',
            ''

        ].join('\n')
  );
  this.emit('end');
}
