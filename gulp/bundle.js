/* global process */

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    gulp = require('gulp'),
    conf = require('./conf'),
    through = require('through2'),
    minify = require('gulp-minifier'),
    amdBundler = require('gulp-amd-bundler'),
    htmlOptimizer = require('gulp-html-optimizer'),
    propertyMerge = require('gulp-property-merge'),
    inlineNg2Template = require('gulp-inline-ng2-template'),
    digestVersioning = require('gulp-digest-versioning');

var VERSION_DIGEST_LEN = 8;
var AMD_BUNDLE_SRC = [
  'dist/browser/js/app/**/*-main.js',
  'dist/browser/js/app/**/main.js',
  'dist/browser/js/app/**/*-main.component.js',
  'dist/browser/js/app/**/main.component.js'
];

var md5map = {};

var isRelativeDependency = function (dep, isRelative) {
  if ((/^\.\.|\bmain(\.component)?$/).test(dep)) {
    return false;
  } else {
    return isRelative;
  }
};
var fixUrl = function (fileName, relPath, basePath) {
  if (!(/^\//).test(fileName)) {
    var filePath = path.resolve(path.dirname(relPath), fileName);
    fileName = '/' + path.relative(basePath, filePath);
  }
  return conf.cdn + fileName;
};

// bundle
gulp.task('bundle', ['inline-template', 'bundle-amd', 'gen-md5map', 'bundle-html', 'minify']);

// minify js, css, html
gulp.task('minify', ['inline-template', 'bundle-amd', 'gen-md5map', 'bundle-html'], function () {
  return gulp.src([
      'dist/browser/**/*.+(js|css)',
      'dist/browser/*.html'
  ])
    .pipe(minify({
      minify: conf.env == 'production',
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('dist/browser'));
});

// bundle amd modules
gulp.task('bundle-amd', ['versioning', 'inline-template'], function () {
  return gulp.src(AMD_BUNDLE_SRC)
    .pipe(amdBundler({
      isRelativeDependency: isRelativeDependency
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

// bundle html
gulp.task('bundle-html', ['gen-md5map', 'inline-template'], function () {
  return gulp.src([
      'dist/browser/index.html'
  ])
    .pipe(propertyMerge({
      properties: {
        md5map: md5map
      }
    }))
    .pipe(htmlOptimizer({
      requireBaseDir: 'dist/browser/js',
      isRelativeDependency: isRelativeDependency
    }))
    .pipe(gulp.dest('dist/node'))
    .pipe(gulp.dest('dist/browser'));
});

// inline template
gulp.task('inline-template', ['init', 'versioning'], function () {
  return gulp.src([
    'dist/browser/js/app/**/*.js'
  ])
    .pipe(inlineNg2Template({
      base: '/dist/browser',
      html: true,
      css: true,
      target: 'es5'
    }))
    .pipe(gulp.dest('dist/browser/js/app'));
});

// digest versioning
gulp.task('versioning', ['init'], function () {
  return gulp.src([
    'dist/browser/**/*.css',
    'dist/browser/**/*.html',
    'dist/browser/**/*.less.js'
  ])
    .pipe(digestVersioning({
      digestLength: VERSION_DIGEST_LEN,
      basePath: 'dist/browser',
      fixUrl: fixUrl
    }))
    .pipe(gulp.dest('dist/browser'));
});
