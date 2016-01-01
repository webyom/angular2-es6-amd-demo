/* global Buffer */

var lazypipe = require('lazypipe'),
    typescript = require('gulp-tsc'),
    through = require('through2');

var EOL = '\n';

// lazy tasks
exports.lazyTscTask = lazypipe()
    .pipe(typescript, {
      module: 'commonjs',
      target: 'ES5',
      experimentalDecorators: true,
      emitDecoratorMetadata: true
    })

exports.lazyAmdWrapTask = lazypipe()
    .pipe(function () {
      return through.obj(function (file, enc, callback) {
        var contents = file.contents.toString();
        if ((/\bexports\b/).test(contents)) {
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
