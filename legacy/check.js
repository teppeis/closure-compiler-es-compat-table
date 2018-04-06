'use strict';

// Run in Node.js v0.10, so don't use ES6 features.
// TEST_DIR=44 if you want to run only specified test

// require('./polyfill');

var fs = require('fs');
var path = require('path');
var readdir = require('fs-readdir-recursive');
var async = require('async');

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

var dirs = require(path.join(buildDir, 'files.json'));
var files = dirs.map(function(dir) {
    return path.join(dir, 'out.js');
  })
  .filter(function(file) {
    return !testDir || file.indexOf(testDir) > -1;
  });

async.map(files, checkTimeout, function(err, results) {
  if (err) {
    return console.error('check.js', err);
  }
  console.log(results.join('\n'));
});

function checkTimeout(file, cb) {
  async.timeout(check, 5000)(file, function(err, msg) {
    if (err) {
      if (err.code === 'ETIMEDOUT') {
        return cb(null, file + ': [Timeout: asyncTestPassed() is not called for 5s]');
      } else {
        return cb(err);
      }
    }
    cb(null, msg);
  });
}

function check(file, cb) {
  delete global.$jscomp;
  delete global.Promise;
  delete global.Symbol;

  // Promise: Promise.prototype isn't an instance
  if (file === 'built-ins/Promise/Promise.prototype_isnt_an_instance/out.js') {
    return cb(null, file + ': [Skip]');
  }
  var fileAbs = path.join(buildDir, file);
  if (!fs.existsSync(fileAbs)) {
    return cb(null, file + ': [CompileError]');
  }

  try {
    var test = require(fileAbs);
    if (test.length) {
      // async
      return test(function() {
        return cb(null, file + ': [Pass]');
      });
    } else {
      // sync
      var res = test();
      if (res) {
        return cb(null, file + ': [Pass]');
      }
      return cb(null, file + ': [InvalidResult: ' + res + ']');
    }
  } catch (err) {
    return cb(null, file + ': ' + err);
  }
}
