'use strict';

var fs = require('fs');
var path = require('path');
var files = require('./build/filelist.json');

var results = [];

var fileno = 0;
files.forEach(function(name) {
  check(name, fileno++);
});

function check(name, i) {
  var outFile = path.join(__dirname, 'build', String(i), 'out.js');
  if (fs.existsSync(outFile)) {
    try {
      var res = require(outFile)();
      if (res) {
        console.log('build/' + i + '/out.js: ' + name);
      }
    } catch (ignore) {
    }
  }
}
