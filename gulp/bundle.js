/* global process */

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    gulp = require('gulp'),
    conf = require('./conf'),
    through = require('through2'),
    bundler = require('gulp-amd-bundler'),
    propertyMerge = require('gulp-property-merge'),
    digestVersioning = require('gulp-digest-versioning');

var VERSION_DIGEST_LEN = 8;
var AMD_BUNDLE_SRC = [
  'dist/browser/js/app/**/*-main.js',
  'dist/browser/js/app/**/main.js',
  'dist/browser/js/app/**/*-main.component.js',
  'dist/browser/js/app/**/main.component.js'
];

var md5map = {};

var fixUrl = function (fileName, relPath, basePath) {
  if (!(/^\//).test(fileName)) {
    var filePath = path.resolve(path.dirname(relPath), fileName);
    fileName = '/' + path.relative(basePath, filePath);
  }
  return conf.cdn + fileName;
};

// bundle
gulp.task('bundle', ['bundle-amd', 'gen-md5map', 'bundle-html']);

// bundle amd modules
gulp.task('bundle-amd', ['versioning'], function () {
  return gulp.src(AMD_BUNDLE_SRC)
    .pipe(bundler({
      isRelativeDependency: function (dep, isRelative) {
        if ((/\bmain$/).test(dep)) {
          return false;
        } else {
          return isRelative;
        }
      }
    }))
    .pipe(gulp.dest('dist/browser/js/app'));
});

// generate md5map for async loaded js
gulp.task('gen-md5map', ['bundle-amd'], function () {
  return gulp.src(AMD_BUNDLE_SRC.concat([
      'dist/browser/js/vendor/**/*.js'
  ]))
    .pipe(through.obj(function (file, enc, next) {
      var md5 = crypto.createHash('md5')
          .update(fs.readFileSync(file.path))
          .digest('hex');
      md5 = md5.substr(0, VERSION_DIGEST_LEN);
      md5map[file.path.split('/dist/browser/js/')[1]] = md5;
      next();
    }));
});

// html
gulp.task('bundle-html', ['gen-md5map'], function () {
  return gulp.src([
      'dist/browser/index.html'
  ])
    .pipe(propertyMerge({
      properties: {
        md5map: md5map
      }
    }))
    .pipe(gulp.dest('dist/browser'));
});

// digest versioning
gulp.task('versioning', ['init'], function () {
  return gulp.src(['dist/browser/**/*.css', 'dist/browser/**/*.html'])
    .pipe(digestVersioning({
      digestLength: VERSION_DIGEST_LEN,
      basePath: 'dist/browser',
      fixUrl: fixUrl
    }))
    .pipe(gulp.dest('dist/browser'));
});
