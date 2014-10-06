'use strict';

var fs = require('fs');
var path = require('path');
var data = require('./compat-table/data-es6');

var results = [];

data.tests.forEach(function(test, i) {
  var outFile = path.join(__dirname, 'build', String(i), 'out.js');
  var res = false;
  if (fs.existsSync(outFile)) {
      try {
          res = require(outFile)();
      } catch (ignore) {
      }
  }
  results.push({
      name: test.name,
      res: res
  });
});

console.log(JSON.stringify(results));
