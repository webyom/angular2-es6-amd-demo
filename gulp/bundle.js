/* global process */

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),
    bundler = require('gulp-amd-bundler'),
    digestVersioning = require('gulp-digest-versioning');

var fixUrl = function (fileName, relPath, basePath) {
  if (!(/^\//).test(fileName)) {
    var filePath = path.resolve(path.dirname(relPath), fileName);
    fileName = '/' + path.relative(basePath, filePath);
  }
  return conf.Services + fileName;
};

// bundle amd modules
gulp.task('bundle', ['versioning'], function () {
  gulp.src(['dist/browser/js/app/**/*-main.js', 'dist/browser/js/app/**/main.js'])
    .pipe(bundler({
    }))
    .pipe(gulp.dest('dist/browser/js/app'));
});

// digest versioning
gulp.task('versioning', ['init'], function () {
  gulp.src(['dist/browser/**/*.css', 'dist/browser/**/*.html'])
    .pipe(digestVersioning({
      digestLength: 8,
      basePath: 'dist/browser',
      fixUrl: fixUrl
    }))
    .pipe(gulp.dest('dist/browser'));
});
