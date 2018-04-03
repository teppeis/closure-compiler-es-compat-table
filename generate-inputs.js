'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const prettier = require('prettier');

const versionToDir = new Map([['es6', 'es6'], ['es2016plus', 'es2016plus'], ['esnext', 'esnext']]);
const esVersion = versionToDir.get(process.env.ES_VERSION);
if (!esVersion) {
  throw new Error(`ES_VERSION is invalid: ${process.env.ES_VERSION}`);
}
const clVersion = process.env.CL_VERSION;
if (!clVersion) {
  throw new Error('CL_VERSION is required');
}

const data = require(`./compat-table/data-${esVersion}`);

const basedir = path.join(__dirname, esVersion, clVersion);
data.tests.forEach(test => {
  if (test.subtests) {
    test.subtests.forEach(subtest => {
      writeInputSrcFile(subtest.exec, test.category, test.name, subtest.name);
    });
  } else {
    writeInputSrcFile(test.exec, test.category, test.name);
  }
});

function escapePath(str) {
  // valid: #$%=~-,_.+
  // invalid: [](){}`^~|@;:`*?"
  return str
    .replace(/[ [\](){}`^~|@;:`*?'"/]/g, '_')
    .replace(/_+/g, '_')
    .replace(/(?:^_|_$)/, '');
}

function writeInputSrcFile(fn, category, test, sub) {
  let dir = path.join(basedir, escapePath(category), escapePath(test));
  let name = `${category} / ${test}`;
  if (sub) {
    dir = path.join(dir, escapePath(sub));
    name = `${name} / ${sub}`;
  }
  mkdirp.sync(dir);
  let src = generateTestJsSrc(fn, name);
  try {
    src = prettier.format(src);
  } catch (ignore) {
    // ignore
  }
  fs.writeFileSync(path.join(dir, 'in.js'), `// ${name}\n${src}`);
}

function generateTestJsSrc(fn, name) {
  let src = generateTestJsSrc_(fn, name);
  if (/global.__createIterableObject\(/.test(src)) {
    src += '\n$jscomp.initSymbolIterator();';
  }
  return src;
}

function generateTestJsSrc_(fn, name) {
  let expr, match;
  if (typeof fn === 'function') {
    expr = fn.toString();
    match = expr.match(/[^]*\/\*([^]*)\*\/\}$/);

    if (!match) {
      if (/\beval\('.*'\)/.test(expr)) {
        // eval
        expr = expr.replace(/\beval\('(.*)'\)/, '$1');
        return `module.exports = ${expr}`;
      } else {
        // normal
        return `module.exports = ${expr}`;
      }
    } else {
      // in comment
      const body = match[1].replace(/^\s+/g, '');
      return `module.exports = function() {\n${body}\n};`;
    }
  } else if (fn.length > 0) {
    // it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    const f = fn[1];
    match = f.script.toString().match(/test\(\(function \(\) {([\s\S]*)}\(\)\)\);/);
    if (match) {
      expr = match[1];
      if (/\beval\('.*'\)/.test(expr)) {
        expr = expr.replace(/\beval\('(.*)'\)/, '$1');
        return `module.exports = function() {\n${expr}\n};`;
      }
    }
  }

  console.error('Unsupported', name);
}
