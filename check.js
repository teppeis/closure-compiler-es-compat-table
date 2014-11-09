'use strict';

var fs = require('fs');
var path = require('path');
var data = require('./compat-table/data-es6');

var results = [];

var fileno = 0;
data.tests.forEach(function(test) {
  if (test.subtests) {
    for (var subtestName in test.subtests) {
      check(test.name + ': ' + subtestName, fileno++);
    }
  } else {
    check(test.name, fileno++);
  }
});

function check(name, i) {
  var outFile = path.join(__dirname, 'build', String(i), 'out.js');
  if (fs.existsSync(outFile)) {
    try {
      var res = require(outFile)();
      if (res) {
        console.log('build/' + fileno + '/out.js: ' + name);
      }
    } catch (ignore) {
    }
  }
}
