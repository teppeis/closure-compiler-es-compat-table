'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var data = require('./compat-table/data-es6');

rimraf.sync('./build');

var fileno = 0;
var files = [];
var basedir = path.join(__dirname, 'build');
data.tests.forEach(function(test) {
  if (test.subtests) {
    test.subtests.forEach(function(subtest) {
      writeInputSrcFile(subtest.exec, test.name + ': ' + subtest.name);
    });
  } else {
    writeInputSrcFile(test.exec, test.name);
  }
});

fs.writeFileSync(path.join(basedir, 'filelist.json'), JSON.stringify(files));

function writeInputSrcFile(fn, name) {
  files.push(name);
  var src = generateTestJsSrc(fn, name);
  var dir = path.join(basedir, String(fileno++));
  mkdirp.sync(dir);
  fs.writeFileSync(path.join(dir, 'in.js'), '// ' + name + '\n' + src);
}

function generateTestJsSrc(fn, name) {
  var src = generateTestJsSrc_(fn, name);
  if (/global.__createIterableObject\(/.test(src)) {
    src = src + '\n$jscomp.initSymbolIterator();';
  }
  return src;
}

function generateTestJsSrc_(fn, name) {
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
      var body = match[1].replace(/^\s+/g, '');
      return 'module.exports = function() {\n' + body + '\n};';
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
