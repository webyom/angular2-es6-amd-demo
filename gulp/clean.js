var path = require('path'),
    gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function (done) {
  return del(['./dist/'], done);
});