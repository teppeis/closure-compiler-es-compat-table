'use strict';

// Run in Node.js v0.10, so don't use ES6 features.
// TEST_DIR=44 if you want to run only specified test

// require('./polyfill');

var fs = require('fs');
var path = require('path');
var readdir = require('fs-readdir-recursive');

var esVersion = process.env.ES_VERSION;
var clVersion = process.env.CL_VERSION;
var testDir = process.env.TEST_DIR;
var buildDir = path.join(path.dirname(__dirname), esVersion, clVersion);

global.__createIterableObject = function(arr, methods) {
  methods = methods || {};
  // eslint-disable-next-line no-undef
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return {};
  }
  arr.length++;
  var iterator = {
    next: function() {
      return {value: arr.shift(), done: arr.length <= 0};
    },
    return: methods.return,
    throw: methods.throw,
  };
  var iterable = {};
  // eslint-disable-next-line no-undef
  iterable[Symbol.iterator] = function() {
    return iterator;
  };
  return iterable;
};

global.asyncTestPassed = function() {
  console.trace('asyncTestPassed');
};

readdir(buildDir)
  .sort()
  .filter(function(file) {
    return /\/out\.js$/.test(file);
  })
  .forEach(function(file) {
    check(file);
  });

function check(file) {
  if (testDir && testDir !== file) {
    return;
  }

  delete global.$jscomp;
  delete global.Promise;
  delete global.Symbol;

  // Promise: Promise.prototype isn't an instance
  if (file === 'built-ins/Promise/Promise.prototype_isn_t_an_instance/out.js') {
    console.error('Skipped: ' + file);
    return;
  }
  var fileAbs = path.join(buildDir, file);
  if (fs.existsSync(fileAbs)) {
    try {
      var res = require(fileAbs)();

      if (res) {
        console.log(file);
      }
    } catch (ignore) {
      console.error(file, ignore);
    }
  }
}
