/* global process */

var config = require('./config');

var env = process.env.NODE_ENV;

if (!config[env]) {
  env = 'development';
}

module.exports = config[env];
module.exports.env = env;
