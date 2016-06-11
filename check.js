'use strict';

// require('./polyfill');

var fs = require('fs');
var path = require('path');
var files = require('./build/filelist.json');

global.__createIterableObject = function(arr, methods) {
  methods = methods || {};
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return {};
  }
  arr.length++;
  var iterator = {
    next: function() {
      return { value: arr.shift(), done: arr.length <= 0 };
    },
    'return': methods['return'],
    'throw': methods['throw']
  };
  var iterable = {};
  iterable[Symbol.iterator] = function(){ return iterator; }
  return iterable;
}

var results = [];

var fileno = 0;
files.forEach(function(name) {
  check(name, fileno++);
});

function check(name, i) {
  // exclude: spread (...) operator: spreading non-iterables is a runtime error
  if (i === 28) return;
  var outFile = path.join(__dirname, 'build', String(i), 'out.js');
  if (fs.existsSync(outFile)) {
    try {
      var res = require(outFile)();
      if (res) {
        console.log('build/' + i + '/out.js: ' + name);
      }
    } catch (ignore) {
    }
  }
}
