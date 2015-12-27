var gulp = require('gulp'),
    bundler = require('gulp-amd-bundler');

// bundle amd modules
gulp.task('bundle', ['init'], function () {
  gulp.src(['dist/browser/js/app/**/*-main.js', 'dist/browser/js/app/**/main.js'])
    .pipe(bundler({
    }))
    .pipe(gulp.dest('dist/browser/js/app'));
});
