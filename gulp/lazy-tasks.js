/* global Buffer */

var lazypipe = require('lazypipe'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    through = require('through2');

var EOL = '\n';

// lazy tasks
exports.lazyTraceurTask = lazypipe()
    .pipe(traceur, {
      modules: 'commonjs',
      annotations: true,
      types: true,
      memberVariables: true
    });

exports.lazyAmdWrapTask = lazypipe()
    .pipe(function () {
      return through.obj(function (file, enc, callback) {
        var contents = file.contents.toString();
        if ((/\bmodule.exports\b/).test(contents)) {
          file.contents = new Buffer([
            'define(function(require, exports, module) {',
            file.contents.toString(),
            '});'
          ].join(EOL));
        }
        this.push(file);
        callback();
      });
    });
