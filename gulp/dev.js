var gulp = require('gulp'),
    webserver = require('gulp-webserver');

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', ['init'], function () {
  return gulp.src('dist/browser')
    .pipe(webserver({
      open: true,
      port: 3000
    }));
});
