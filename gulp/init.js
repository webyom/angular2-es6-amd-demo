var gulp = require('gulp'),
    less = require('gulp-less'),
    mt2amd = require('gulp-mt2amd'),
    lazyTasks = require('./lazy-tasks');

// run init tasks
gulp.task('init', ['dependencies', 'tsc', 'js', 'html', 'less', 'img']);

// transpile ts
gulp.task('tsc', function () {
  return gulp.src('src/js/app/**/*.ts')
    .pipe(lazyTasks.lazyTscTask())
    .pipe(gulp.dest('dist/node/js/app'))
    .pipe(lazyTasks.lazyAmdWrapTask())
    .pipe(gulp.dest('dist/browser/js/app'));
});

// move js
gulp.task('js', function () {
  return gulp.src('src/js/config/**/*.js')
    .pipe(gulp.dest('dist/node/js/config'))
    .pipe(gulp.dest('dist/browser/js/config'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/browser'));
});

// compile less
gulp.task('less', function () {
  return gulp.src(['src/**/*-main.less', 'src/**/main.less'])
    .pipe(less())
    .pipe(gulp.dest('dist/browser'));
});

// compile less to amd module
gulp.task('less-to-amd', function () {
  return gulp.src(['src/js/app/**/*-main.less', 'src/js/app/**/main.less'])
    .pipe(mt2amd())
    .pipe(gulp.dest('dist/browser/js/app'));
});

// move img
gulp.task('img', function () {
  return gulp.src('src/**/*.+(jpg|jpeg|gif|png|otf|eot|svg|ttf|woff|woff2|ico|mp3|swf)')
    .pipe(gulp.dest('dist/browser'));
});
