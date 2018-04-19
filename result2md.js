#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const humanize = require('humanize-string');

const cli = meow(
  `
	Usage
	  $ result2md.js RESULT

	Examples
    $ ./runjs es6/v20180402/result.txt
`,
  {
    flags: {},
  }
);

if (cli.input.length !== 1) {
  cli.showHelp();
}
const resultFilePass = cli.input[0];
const match = /^(es[^/]+)\/([^/]+)/.exec(resultFilePass);
const [, esVersion, clVersion] = match;
if (!esVersion) {
  throw new Error(`ES_VERSION is invalid`);
}
const alterTestDir = path.join(__dirname, 'alter-tests', esVersion);
const fileInfo = require(path.join(alterTestDir, 'fileinfo.json'));
const resultFile = fs.readFileSync(path.join(process.cwd(), resultFilePass), 'utf8');

const failedFileInfo = resultFile
  .split('\n')
  .filter(line => !!line)
  .map(line => {
    const match = /^([^:]*): (.*)$/.exec(line);
    if (!match) {
      throw new Error(`Invalid result line: ${line}`);
    }
    const [, out, result] = match;
    return {out, result};
  })
  .filter(({result}) => result !== '[Pass]')
  .map(({out, result}) => {
    const dir = path.dirname(out);
    const info = fileInfo.find(({path}) => path === dir);
    if (!info) {
      throw new Error(`fileInfo not found: ${dir}`);
    }
    const escapedPath = escapeDirAsUrl(out);
    const url = `https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/${esVersion}/${clVersion}/${escapedPath}`;
    return {...info, result, url};
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
const skipSubtests = new Set([
  'Reflect.construct, Array subclassing',
  'Reflect.construct, RegExp subclassing',
  'Reflect.construct, Function subclassing',
]);
let prevCategory = null;
let prevTest = null;
failedFileInfo
  .filter(info => !!info)
  .filter(({category}) => !skipCategories.has(category.toLowerCase()))
  .filter(({test}) => !/^Proxy/.test(test))
  .filter(({subtest}) => !skipSubtests.has(subtest))
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
    if (/error\.txt$/.test(url)) {
      // compile error
      output.push(`- ${subtestName} ([compile error](${url}))`);
    } else {
      // invalid transpile or not implemented
      const input = `${path.dirname(url)}/in.js`;
      output.push(`- ${subtestName} ([in](${input})/[out](${url}))`);
    }
  });

console.log(output.join('\n'));
