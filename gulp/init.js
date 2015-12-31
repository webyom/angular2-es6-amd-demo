var gulp = require('gulp'),
    less = require('gulp-less'),
    mt2amd = require('gulp-mt2amd'),
    lazyTasks = require('./lazy-tasks');

// run init tasks
gulp.task('init', ['dependencies', 'js', 'html', 'less', 'less-to-amd', 'img']);

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(lazyTasks.lazyTraceurTask())
    .pipe(gulp.dest('dist/node'))
    .pipe(lazyTasks.lazyAmdWrapTask())
    .pipe(gulp.dest('dist/browser'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/browser'));
});

// compile less
gulp.task('less', function () {
  return gulp.src(['src/css/**/*-main.less', 'src/css/**/main.less'])
    .pipe(less())
    .pipe(gulp.dest('dist/browser/css'));
});

// compile less to amd module
gulp.task('less-to-amd', function () {
  return gulp.src(['src/js/app/**/*-main.less', 'src/js/app/**/main.less'])
    .pipe(mt2amd({
    }))
    .pipe(gulp.dest('dist/browser/js/app'));
});

// move img
gulp.task('img', function () {
  return gulp.src('src/**/*.+(jpg|jpeg|gif|png|otf|eot|svg|ttf|woff|woff2|ico|mp3|swf)')
    .pipe(gulp.dest('dist/browser'));
});
