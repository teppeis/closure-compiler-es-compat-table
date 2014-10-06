'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var data = require('./compat-table/data-es6');

data.tests.forEach(function(test, i) {
  var src = generateTestJsSrc(test.exec);
  var dir = path.join(__dirname, 'build', String(i));
  mkdirp.sync(dir);
  fs.writeFileSync(path.join(dir, 'in.js'), '// ' + test.name + '\n' + src);
});

function generateTestJsSrc(fn) {
  if (typeof fn === 'function') {
    var expr = fn.toString();
    var match = expr.match(/[^]*\/\*([^]*)\*\/\}$/);

    if (!match) {
      if (/\beval\('.*'\)/.test(expr)) {
        expr = expr.replace(/\beval\('(.*)'\)/, '$1');
        return 'module.exports = function() {\n' + expr + '\n};';
      }
      return 'module.exports = function() {return false;};';
    } else {
      return 'module.exports = function() {\n' + match[1] + '\n};';
    }
  } else {
    // TODO: it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    // return fn.reduce(function(text, script) {
    //   var expr = deindentFunc(
    //       (script.script+'').replace(/^function \(\) \{\s*|\s*\}$/g, '')
    //     );
    //   return text + '<script' + (script.type ? ' type="' + script.type + '"' : '') +
    //     ' data-source="' + expr.replace(/"/g,'&quot;') + '">' +
    //     expr + '</script>\n';
    // },'');
    return 'module.exports = function() {return false;};';
  }
}
