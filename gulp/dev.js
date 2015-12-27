var gulp = require('gulp'),
    webserver = require('gulp-webserver');

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', ['init'], function () {
  gulp.src('dist/browser')
    .pipe(webserver({
      open: true
    }));
});
