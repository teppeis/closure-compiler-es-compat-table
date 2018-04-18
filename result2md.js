#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const humanize = require('humanize-string');

const cli = meow(`
	Usage
	  $ result2md.js RESULT

	Examples
    $ ./runjs es6/v20180402/pass.txt
`, {
	flags: {
	}
});

if (cli.input.length !== 1) {
  cli.showHelp();
}
const passFilePass = cli.input[0];
const match = /^(es[^/]+)/.exec(passFilePass);
let [, esVersion] = match;
if (!esVersion) {
  throw new Error(`ES_VERSION is invalid`);
}
const alterTestDir = path.join(__dirname, 'alter-tests', esVersion);
const fileInfo = require(path.join(alterTestDir, 'fileinfo.json'));
const passFile = fs.readFileSync(path.join(process.cwd(), passFilePass), 'utf8');

const failedFileInfo = fileInfo
  .filter(({path}) => !passFile.includes(path))
  .map(info => {
    if (!info) {
      throw new Error(`fileinfo not found: ${dir}`);
    }
    const escapedPath = escapeDirAsUrl(info.path);
    info.url = `https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/latest/${escapedPath}`;
    return info;
  });

function escapeDirAsUrl(dir) {
  return dir
    .split('/')
    .map(encodeURIComponent)
    .join('/');
}

// const output = [`# ES2015`];
const output = [];
const skipCategories = new Set(['subclassing']);
let prevCategory = null;
let prevTest = null;
failedFileInfo
  .filter(info => !!info)
  .filter(({category}) => !skipCategories.has(category.toLowerCase()))
  .filter(({test}) => !/^Proxy/.test(test))
  .forEach(({category, test, subtest, url}) => {
    if (prevCategory !== category) {
      output.push(`\n## ${humanize(category)}`);
      prevCategory = category;
    }
    if (prevTest !== test) {
      output.push(`\n### ${test}`);
      prevTest = test;
    }
    if (test === 'typed arrays') {
      return;
    }
    let subtestName = subtest;
    if (!subtest) {
      subtestName = test;
    }
    output.push(`- ${subtestName} ([in](${url}/in.js)/[out](${url}/out.js))`);
});

console.log(output.join('\n'));
