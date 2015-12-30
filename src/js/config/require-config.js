/* global G */

G.REQUIRE_BASE_URL = document.getElementById('require-config-script').src.split('/js/config/')[0] + '/js';

var require = require || {
  baseUrl: G.REQUIRE_BASE_URL,
  paths: {
  },
  resolveUrl: function(url) {
    var baseUrl = G.REQUIRE_BASE_URL;
    var path;
    if (url.indexOf(baseUrl) === 0) {
      path = url.replace(baseUrl, '').replace(/^\//, '');
    }
    if (path) {
      var md5 = G.MD5_MAP[path];
      if (md5) {
        if (url.indexOf('?') > 0) {
          return url + '&v=' + md5;
        } else {
          return url + '?v=' + md5;
        }
      } else {
        return url;
      }
    } else {
      return url;
    }
  }
};