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
const alterTestDir = path.join(__dirname, 'alter-tests', esVersion);
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
  // invalid: [](){}`^~|@;:`*?"<>
  return str
    .replace('\u{2e2f}', 'U+2E2F')
    .replace('\u{102c0}', 'U+102C0')
    .replace(/['"]/g, '')
    .replace(/<\/?code>/g, '')
    .replace(/=>/g, 'arrow')
    .replace(/ \(([^)]+)\)]/g, ' $1')
    .replace(/[ [\](){}<>`^~|@;:`*?/]/g, '_');
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
  let src = generateTestJsSrc(fn, name, dir);
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

function generateTestJsSrc(fn, name, dir) {
  let src = generateTestJsSrc_(fn, name, dir);
  if (/global.__createIterableObject\(/.test(src)) {
    // TODO: should inject automatically
    src += '\n$jscomp.initSymbolIterator();';
  }
  return src;
}

function generateTestJsSrc_(fn, name, dir) {
  if (typeof fn === 'function') {
    let expr = fn.toString();
    const match = expr.match(/[^]*\/\*([^]*)\*\/\}$/);
    if (match) {
      // extract source in comment style
      expr = match[1].replace(/^\s+/g, '');
    }
    // remove indent for template literal test code
    expr = expr.replace(/^ */gm, '');
    const param = /\basyncTestPassed\(/.test(expr) ? 'asyncTestPassed' : '';
    let result = `module.exports = function(${param}) {\n${expr}\n};`;
    const useEval = /\beval\(/.test(expr) || /\bFunction\(/.test(expr);
    if (!useEval) {
      return result;
    }

    let alter;
    const altDir = path.join(alterTestDir, path.relative(basedir, dir));
    try {
      const origSrc = fs.readFileSync(path.join(altDir, 'orig.js'), 'utf8');
      if (origSrc === result) {
        alter = fs.readFileSync(path.join(altDir, 'alter.js'), 'utf8');
      } else {
        console.error('changed eval test:', name);
      }
    } catch (ignore) {}

    if (alter) {
      result = alter;
    } else {
      mkdirp.sync(altDir);
      fs.writeFileSync(path.join(altDir, 'orig.js'), result);
      result = `module.exports = function(${param}) {
throw new Error('eval() and Function() cannot be transpiled');
${expr}
};`;
    }
    return result;
  } else if (Array.isArray(fn) && fn.length > 0) {
    // NOTE: not used now
    // it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    throw new Error(name + ': test is an array');
  } else {
    throw new Error(name + ': unknown test type :' + fn);
  }
}
