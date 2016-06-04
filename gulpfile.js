'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const jshint = require('gulp-jshint');
const jscpd = require('gulp-jscpd');
const jscs = require('gulp-jscs');
const jsdoc = require('gulp-jsdoc3');
const shell = require('gulp-shell');

//config
const paths = {
  from: ['src/**/*.js', 'app/*.js'],
  to: 'build/'
};

gulp.task('lint', function () {
  return gulp.src(paths.from, { base: '.' })
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

    //.pipe(jshint.reporter('fail'));
});

gulp.task('jscpd', function () {
  return gulp.src(paths.from, { base: '.' })
    .pipe(jscpd());
});

gulp.task('jscs', function () {
  return gulp.src(paths.from, { base: '.' })
    .pipe(jscs({
      errorCount: 20
    }))
    .pipe(jscs.reporter());
});

gulp.task('jsdoc', function () {
  const jsDocConf = require('./jsdocConf.json');
  
  return gulp.src(paths.from, { base: '.', read: false })
    .pipe(jsdoc());
});

gulp.task('before-test', function () {
  return gulp.src(paths.from, { base: '.' })
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['before-test'], function () {
  return gulp.src('./test/*.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }));
});

gulp.task('prepare-casper-test', function () {
  return gulp.src('./test/casperjs/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/test'))
});

gulp.task('casper-test', ['prepare-casper-test'], function () {
  return gulp.src('./build/test/*.js', { read: false })
    .pipe(shell(['./node_modules/mocha-casperjs/bin/mocha-casperjs ./build/test/*.js', 'rm -rf ./build/test']))
});

gulp.task('js', ['lint', 'jscpd', 'jscs'], function () {
  return gulp.src(paths.from, { base: '.' })
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.to));
});

gulp.task('build', ['test', 'js', 'casper-test', 'jsdoc']);

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
