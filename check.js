'use strict';

// TEST_DIR=44 if you want to run only specified test

// require('./polyfill');

var fs = require('fs');
var path = require('path');
var esVersion = process.env.ES_VERSION;
var files = require('./' + esVersion + '/build/filelist.json');

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

global.asyncTestPassed = function() {
  console.trace('asyncTestPassed');
}

var results = [];

var fileno = 0;
files.forEach(function(name) {
  check(name, fileno++);
});

function check(name, i) {
  if (process.env.TEST_DIR && process.env.TEST_DIR != i) {
    return;
  }

  delete global.$jscomp;
  delete global.Promise;
  delete global.Symbol;

  // Promise: Promise.prototype isn't an instance
  if (i === 395) return;
  var outFile = path.join(__dirname, esVersion, 'build', String(i), 'out.js');
  if (fs.existsSync(outFile)) {
    try {
      var res = require(outFile)();
      if (res) {
        console.log( esVersion + '/build/' + i + '/out.js: ' + name);
      }
    } catch (ignore) {
    }
  }
}
