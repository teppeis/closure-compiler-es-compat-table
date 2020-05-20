"use strict";

// Run in Node.js v0.10, so don't use ES6 features.
// TEST_DIR=44 if you want to run only specified test

// require('./polyfill');

var fs = require("fs");
var vm = require("vm");
var path = require("path");
var async = require("async");
var assign = require("object-assign");

var esVersion = process.env.ES_VERSION;
var clVersion = process.env.CL_VERSION;
var testDir = process.env.TEST_DIR;
var buildDir = path.join(path.dirname(__dirname), esVersion, clVersion);

var dirs = require(path.join(buildDir, "files.json"));
var files = dirs
  .map(function(dir) {
    return path.join(dir, "out.js");
  })
  .filter(function(file) {
    return !testDir || file.indexOf(testDir) > -1;
  });

var createIterableObjectFunc = fs.readFileSync(
  path.join(__dirname, "__createIterableObject.js"),
  "utf8"
);

async.mapSeries(files, checkTimeout, function(err, results) {
  if (err) {
    return console.error("check.js", err);
  }
  console.log(
    results
      .map(function(msg) {
        return msg
          .split("\n")
          .map(function(line) {
            return line.trim();
          })
          .join(" ");
      })
      .join("\n")
  );
});

function checkTimeout(file, cb) {
  async.timeout(check, 5000)(file, function(err, msg) {
    if (err) {
      if (err.code === "ETIMEDOUT") {
        return cb(null, file + ": [Timeout: asyncTestPassed() is not called for 5s]");
      } else {
        return cb(err);
      }
    }
    cb(null, msg);
  });
}

/**
 * Compiler doesn't output error code before v20190528.
 */
function isOldOutputCompiler() {
  var match = /^v(\d{8})$/.exec(clVersion);
  if (!match) {
    throw new Error("Unexpected clVersion: " + clVersion);
  }
  var clVersionNumber = parseInt(match[1], 10);
  return clVersionNumber < 20190528;
}

// TODO: check unexpected error
function checkExpectedError(fileAbs, cb) {
  var dir = path.dirname(fileAbs);
  var fileRelative = path.relative(buildDir, fileAbs);
  var errorFile = path.join(dir, "error.txt");
  var errorRelative = path.relative(buildDir, errorFile);
  var inputFile = path.join(dir, "in.js");
  try {
    var error = fs.readFileSync(errorFile, "utf8");
    var input = fs.readFileSync(inputFile, "utf8");
    // `EXPECT: [LINE]: [ERROR_MESSAGE]`
    // ex) EXPECT: 4: ERROR - Illegal variable reference before declaration: a
    var regex = /^\/\/ EXPECT: (\d.*)/gm;
    var match;
    var expectError = false;
    while ((match = regex.exec(input)) !== null) {
      expectError = true;
      var expect = ":" + match[1];
      if (error.indexOf(expect) > -1) {
        continue;
      }
      if (isOldOutputCompiler()) {
        var oldMatch = /^:\d+: ERROR\b/.exec(expect);
        if (oldMatch && error.indexOf(oldMatch[0]) > -1) {
          continue;
        }
      }
      return cb(null, errorRelative + ": [NotExpectedCompileError]");
    }
    if (expectError) {
      return cb(null, fileRelative + ": [Pass]");
    } else {
      return cb(null, errorRelative + ": [CompileError]");
    }
  } catch (e) {
    console.error("both out.js and error.txt are nothing", fileRelative);
    return cb(e);
  }
}

function check(file, cb) {
  // Promise: Promise.prototype isn't an instance
  if (file === "built-ins/Promise/Promise.prototype_isnt_an_instance/out.js") {
    return cb(null, file + ": [Skip]");
  }
  var fileAbs = path.join(buildDir, file);
  if (!fs.existsSync(fileAbs)) {
    return checkExpectedError(fileAbs, cb);
  }

  var context = {
    module: {},
    require: require,
    callback: null,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    // avoid no side-effects suspicious warnings
    ensureUsed: function() {},
    // console: console,
  };

  // Math.fround polyfill requires Float32Array
  // https://github.com/google/closure-compiler/commit/5d04b3ccad67e6d2a1a9edcc8f31a7fa2a1ba996
  if (file === "built-in_extensions/Math_methods/Math.fround/out.js") {
    // context.Float32Array = Float32Array;
  }

  try {
    var test = fs.readFileSync(fileAbs, "utf8");
    var src =
      // Node v0.10 implements trimLeft/Right
      "delete String.prototype.trimLeft;" +
      "delete String.prototype.trimRight;" +
      'var global = Function("return this")();' +
      test +
      ";" +
      createIterableObjectFunc +
      ";module.exports(callback);";
    if (isAsyncTest(test)) {
      // async
      return vm.runInNewContext(
        src,
        assign(context, {
          callback: function() {
            return cb(null, file + ": [Pass]");
          },
        }),
        file
      ); // for Node v0.10 API
    } else {
      // sync
      var res = vm.runInNewContext(src, context, file); // for Node v0.10 API
      if (res) {
        return cb(null, file + ": [Pass]");
      }
      return cb(null, file + ": [InvalidResult: " + res + "]");
    }
  } catch (err) {
    // console.error(err.stack);
    return cb(null, file + ": " + err);
  } finally {
    // console.log('context', context);
  }
}

function isAsyncTest(src) {
  return /^module.exports = function\([^)]+\)/m.test(src);
}
