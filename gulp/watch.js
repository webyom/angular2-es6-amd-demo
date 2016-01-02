var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    mt2amd = require('gulp-mt2amd'),
    lazyTasks = require('./lazy-tasks');

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/js/app/**/*.ts', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/js/app/').pop();
    gutil.log('file', filePath, 'changed');
    return gulp.src(filePath)
      .pipe(lazyTasks.lazyTscTask())
      .pipe(gulp.dest('dist/node/js/app/' + part))
      .pipe(lazyTasks.lazyAmdWrapTask())
      .pipe(gulp.dest('dist/browser/js/app/' + part));
  });

  gulp.watch('src/js/config/**/*.js', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/js/config/').pop();
    gutil.log('file', filePath, 'changed');
    return gulp.src(filePath)
      .pipe(gulp.dest('dist/browser/js/config/' + part));
  });

  gulp.watch('src/**/*.html', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/').pop();
    gutil.log('file', filePath, 'changed');
    return gulp.src(filePath)
      .pipe(gulp.dest('dist/browser/' + part));
  });

  gulp.watch('src/css/**/*.less', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/css/').pop();
    if ((/(^|\-)main.less$/).test(path.basename(filePath))) {
      gutil.log('file', filePath, 'changed');
      return gulp.src(filePath)
        .pipe(less())
        .pipe(gulp.dest('dist/browser/css/' + part));
    } else {
      return gulp.start('less');
    }
  });

  gulp.watch('src/js/app/**/*.less', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/js/app/').pop();
    if ((/(^|\-)main.less$/).test(path.basename(filePath))) {
      gutil.log('file', filePath, 'changed');
      return gulp.src(filePath)
        .pipe(mt2amd())
        .pipe(gulp.dest('dist/browser/js/app/' + part));
    } else {
      return gulp.start('less-to-amd');
    }
  });
});
