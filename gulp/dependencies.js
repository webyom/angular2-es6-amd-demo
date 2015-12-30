var gulp = require('gulp');

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/yom-require/src/require.js',
    'node_modules/@reactivex/rxjs/dist/global/Rx.umd.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/angular2/bundles/angular2-all.umd.js',
    'node_modules/angular2-amd-wrapper/dist/angular2.js',
    'node_modules/jquery/dist/jquery.js'
  ])
    .pipe(gulp.dest('dist/browser/js/vendor'));
});
