'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const Linter = require('eslint').Linter;

const versionToDir = new Map([['es6', 'es6'], ['es2016plus', 'es2016plus'], ['esnext', 'esnext']]);
const esVersion = versionToDir.get(process.env.ES_VERSION);
if (!esVersion) {
  throw new Error(`ES_VERSION is invalid: ${process.env.ES_VERSION}`);
}
const clVersion = process.env.CL_VERSION;
if (!clVersion) {
  throw new Error('CL_VERSION is required');
}
const testDir = process.env.TEST_DIR;

const data = require(`./compat-table/data-${esVersion}`);
const fileList = [];
const linter = new Linter();

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

if (!testDir) {
  fs.writeFileSync(path.join(basedir, 'files.json'), JSON.stringify(fileList, null, 2));
}

function escapePath(str) {
  // valid: #$%=~-,_.+
  // invalid: [](){}`^~|@;:`*?"
  return str
    .replace(/['"]/g, '')
    .replace(/ \(([^)]+)\)]/g, ' $1')
    .replace(/[ [\](){}`^~|@;:`*?/]/g, '_');
}

function writeInputSrcFile(fn, category, test, sub) {
  let dir = path.join(basedir, escapePath(category), escapePath(test));
  let name = `${category} / ${test}`;
  if (sub) {
    dir = path.join(dir, escapePath(sub));
    name = `${name} / ${sub}`;
  }
  if (testDir && !`${dir}/`.includes(testDir)) {
    return;
  }
  mkdirp.sync(dir);
  let src = generateTestJsSrc(fn, name);
  src = format(src);
  fs.writeFileSync(path.join(dir, 'in.js'), `// ${name}\n${src}`);
  fileList.push(path.relative(basedir, dir));
}

function format(src) {
  try {
    const {output} = linter.verifyAndFix(src, {
      parserOptions: {
        ecmaVersion: 2018
      },
      rules: {
        indent: ['error', 2],
      },
    });
    return output;
  } catch (ignore) {
    console.error(ignore);
    // cannot parse src including newer syntax than ES2018
    return src;
  }
}

function generateTestJsSrc(fn, name) {
  let src = generateTestJsSrc_(fn, name);
  if (/global.__createIterableObject\(/.test(src)) {
    // TODO: should inject automatically
    src += '\n$jscomp.initSymbolIterator();';
  }
  return src;
}

function generateTestJsSrc_(fn, name) {
  if (typeof fn === 'function') {
    let expr = fn.toString();
    const match = expr.match(/[^]*\/\*([^]*)\*\/\}$/);
    if (match) {
      // extract source in comment style
      expr = match[1].replace(/^\s+/g, '');
    }
    // remove indent for template literal test code
    expr = expr.replace(/^ */gm, '');
    let param = '';
    if (/\beval\(/.test(expr) || /\bFunction\(/.test(expr)) {
      expr = "throw new Error('eval() and Function() cannot be transpiled');\n" + expr;
    }
    if (/asyncTestPassed/.test(expr)) {
      param = 'asyncTestPassed';
    }
    return `module.exports = function(${param}) {\n${expr}\n};`;
  } else if (Array.isArray(fn) && fn.length > 0) {
    // NOTE: not used now
    // it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    throw new Error(name + ': test is an array');
  } else {
    throw new Error(name + ': unknown test type :' + fn);
  }
}
