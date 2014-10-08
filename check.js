'use strict';

var fs = require('fs');
var path = require('path');
var data = require('./compat-table/data-es6');

var results = [];

data.tests.forEach(function(test, i) {
  var outFile = path.join(__dirname, 'build', String(i), 'out.js');
  if (fs.existsSync(outFile)) {
    try {
      var res = require(outFile)();
      if (res) {
        console.log(test.name);
      }
    } catch (ignore) {
    }
  }
});
