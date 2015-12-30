var gulp = require('gulp'),
    less = require('gulp-less'),
    lazyTasks = require('./lazy-tasks');

// run init tasks
gulp.task('init', ['dependencies', 'js', 'html', 'less', 'img']);

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
    .pipe(gulp.dest('dist/node'))
    .pipe(gulp.dest('dist/browser'));
});

// compile less
gulp.task('less', function () {
  return gulp.src(['src/**/*-main.less', 'src/**/main.less'])
    .pipe(less())
    .pipe(gulp.dest('dist/node'))
    .pipe(gulp.dest('dist/browser'));
});

// move img
gulp.task('img', function () {
  return gulp.src('src/**/*.+(jpg|jpeg|gif|png|otf|eot|svg|ttf|woff|woff2|ico|mp3|swf)')
    .pipe(gulp.dest('dist/browser'));
});
