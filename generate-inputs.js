'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var data = require('./compat-table/data-es6');

rimraf.sync('./build');

var fileno = 0;
data.tests.forEach(function(test) {
  if (test.subtests) {
    for (var subtestName in test.subtests) {
      writeInputSrcFile(test.subtests[subtestName].exec, test.name + ': ' + subtestName);
    }
  } else {
    writeInputSrcFile(test.exec, test.name);
  }
});

function writeInputSrcFile(fn, name) {
  var src = generateTestJsSrc(fn, name);
  var dir = path.join(__dirname, 'build', String(fileno++));
  mkdirp.sync(dir);
  fs.writeFileSync(path.join(dir, 'in.js'), '// ' + name + '\n' + src);
}

function generateTestJsSrc(fn, name) {
  var expr, match;
  if (typeof fn === 'function') {
    expr = fn.toString();
    match = expr.match(/[^]*\/\*([^]*)\*\/\}$/);

    if (!match) {
      if (/\beval\('.*'\)/.test(expr)) {
        // eval
        expr = expr.replace(/\beval\('(.*)'\)/, '$1');
        return 'module.exports = ' + expr;
      } else {
        // normal
        return 'module.exports = ' + expr;
      }
    } else {
      // in comment
      return 'module.exports = function() {\n' + match[1] + '\n};';
    }
  } else if (fn.length > 0) {
    // it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    var f = fn[1];
    match = f.script.toString().match(/test\(\(function \(\) {([\s\S]*)}\(\)\)\);/); 
    if (match) {
      expr = match[1];
      if (/\beval\('.*'\)/.test(expr)) {
        expr = expr.replace(/\beval\('(.*)'\)/, '$1');
        return 'module.exports = function() {\n' + expr + '\n};';
      }
    }
  }

  console.error('Unsupported', name);
}
