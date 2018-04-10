#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const Linter = require('eslint').Linter;

const {testDir, alterTestDir, data} = init();
const fileList = [];
const linter = new Linter();

class TestCode {
  constructor(expr, name) {
    this.expr = expr;
    this.name = name;
    this.isAsync = /\basyncTestPassed\(/.test(expr);
    this.useEval = /\beval\(/.test(expr) || /\bFunction\(/.test(expr);
    // TODO: should inject automatically
    this.useCreateIterable = /global.__createIterableObject\(/.test(expr);
  }

  toString(ignoreEval = false) {
    const param = this.isAsync ? 'asyncTestPassed' : '';
    const throws = this.useEval && !ignoreEval ?
      `throw new Error('eval() and Function() cannot be transpiled');\n` : '';
    const initIterator = this.useCreateIterable ? '\n$jscomp.initSymbolIterator();' : '';
    const src = `// ${this.name}
module.exports = function(${param}) {
${throws}${this.expr}
};${initIterator}`;
    return format(src);
  }
}

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
  fs.writeFileSync(path.join(alterTestDir, 'files.json'), JSON.stringify(fileList, null, 2));
}

function init() {
  const versionToDir = new Map([['es6', 'es6'], ['es2016plus', 'es2016plus'], ['esnext', 'esnext']]);
  const esVersion = versionToDir.get(process.env.ES_VERSION);
  if (!esVersion) {
    throw new Error(`ES_VERSION is invalid: ${process.env.ES_VERSION}`);
  }
  const testDir = process.env.TEST_DIR;
  const alterTestDir = path.join(__dirname, 'alter-tests', esVersion);
  mkdirp.sync(alterTestDir);
  const data = require(`./compat-table/data-${esVersion}`);
  return {testDir, alterTestDir, data};
}

function writeInputSrcFile(fn, category, test, sub) {
  let dir = path.join(alterTestDir, escapePath(category), escapePath(test));
  let name = `${category} / ${test}`;
  if (sub) {
    dir = path.join(dir, escapePath(sub));
    name = `${name} / ${sub}`;
  }
  if (testDir && !`${dir}/`.includes(testDir)) {
    return;
  }
  const origPath = path.join(dir, 'orig.js');
  generateTestJsSrc(fn, name, origPath);
  fileList.push(path.relative(alterTestDir, dir));
}

function escapePath(str) {
  // valid: #$%=~-,_.+
  // invalid: [](){}`^~|@;:`*?"<>
  return str
    .replace('\u{2e2f}', 'U+2E2F')
    .replace('\u{102c0}', 'U+102C0')
    .replace(/<\/?code>/g, '')
    .replace(/=>/g, 'arrow')
    .replace(/['"]/g, '')
    .replace(/ \(([^)]+)\)]/g, ' $1')
    .replace(/[ [\](){}<>`^~|@;:`*?/]/g, '_');
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

function generateTestJsSrc(fn, name, origPath) {
  if (typeof fn === 'function') {
    const testCode = createTestCode(fn, name);
    const existingSrc = getExistigSrc(origPath);
    if (existingSrc) {
      if (existingSrc === testCode.toString()) {
        return;
      } else {
        console.error('changed test:', name);
      }
    }
    mkdirp.sync(path.dirname(origPath));
    fs.writeFileSync(origPath, testCode.toString());
  } else if (Array.isArray(fn) && fn.length > 0) {
    // NOTE: not used now
    // it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    throw new Error(name + ': test is an array');
  } else {
    throw new Error(name + ': unknown test type :' + fn);
  }
}

function createTestCode(fn, name) {
  let expr = fn.toString();
  const match = expr.match(/[^]*\/\*([^]*)\*\/\}$/);
  if (match) {
    // extract source in comment style
    expr = match[1];
  }
  // remove indent for template literal test code
  expr = expr.replace(/^\s*/gm, '');
  return new TestCode(expr, name);
}

function getExistigSrc(origPath) {
  try {
    return fs.readFileSync(origPath, 'utf8');
  } catch (ignore) {
    return null;
  }
}
