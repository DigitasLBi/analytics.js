'use strict';

var analytics = analytics || {};

(function() {
  analytics.namespace = function(nsString) {
    var parts = nsString.split('.'),
        parent = analytics,
        i;
    if (parts[0] === 'analytics') {
      parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }
    return parent;
  };
}());
