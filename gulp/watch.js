var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    lazyTasks = require('./lazy-tasks');

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', function (evt) {
    var filePath = evt.path;
    var part = path.dirname(filePath).split('/src/').pop();
    gutil.log('file', filePath, 'changed');
    return gulp.src(filePath)
      .pipe(lazyTasks.lazyTraceurTask())
      .pipe(gulp.dest('dist/node/' + part))
      .pipe(lazyTasks.lazyAmdWrapTask())
      .pipe(gulp.dest('dist/browser/' + part));
  });
  
  gulp.watch('src/**/*.html', function (evt) {
    var filePath = evt.path;
    var part = path.dirname(filePath).split('/src/').pop();
    gutil.log('file', filePath, 'changed');
    return gulp.src(filePath)
      .pipe(gulp.dest('dist/browser/' + part));
  });
  
  gulp.watch('src/**/*.less', function (evt) {
    var filePath = evt.path;
    var part = path.dirname(filePath).split('/src/').pop();
    if ((/(^|\-)main.less$/).test(path.basename(filePath))) {
      gutil.log('file', filePath, 'changed');
      return gulp.src(filePath)
        .pipe(less())
        .pipe(gulp.dest('dist/browser/' + part));
    } else {
      return gulp.start('less');
    }
  });
});
