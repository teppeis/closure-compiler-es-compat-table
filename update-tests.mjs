#!/usr/bin/env node

import { Linter } from "eslint";
import fs from "fs";
import glob from "glob";
import meow from "meow";
import mkdirp from "mkdirp";
import { createRequire } from "module";
import path from "path";
import rimraf from "rimraf";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);

const cli = meow(
  `
	Usage
	  $ update-tests.js [ES_VERSION]

	Examples
    $ ./update-tests.js
    $ ./update-tests.js es6
`,
  {
    flags: {},
  }
);

if (cli.input.length > 2) {
  cli.showHelp();
}

const linter = new Linter();

class TestCode {
  constructor(expr, name) {
    this.expr = expr;
    this.name = name;
    this.isAsync = /\basyncTestPassed\(/.test(expr);
    this.useEval = /\beval\(/.test(expr) || /\bFunction\(/.test(expr);
    // TODO: should inject automatically
    this.useCreateIterable = /__createIterableObject\(/.test(expr);
  }

  toString(ignoreEval = false) {
    const param = this.isAsync ? "asyncTestPassed" : "";
    const throws =
      this.useEval && !ignoreEval
        ? `throw new Error('eval() and Function() cannot be transpiled');\n`
        : "";
    const initIterator = this.useCreateIterable
      ? "module.exports._ = Symbol.iterator;\n"
      : "";
    // Use arrow function to enable EarlyEs6ToEs3Converter for Symbol polyfill
    // @see https://github.com/google/closure-compiler/issues/2881#issuecomment-381416295
    const src = `// ${this.name}
module.exports = (${param}) => {
${throws}${initIterator}${this.expr}
};`;
    return format(src);
  }
}

const esVersions =
  cli.input.length > 0 ? [cli.input[0]] : ["es6", "es2016plus", "esnext"];
esVersions.forEach((esVersion) => {
  const { testDir, alterTestDir, data } = init(esVersion);
  const fileList = [];
  data.tests.forEach((test) => {
    if (test.subtests) {
      test.subtests.forEach((subtest) => {
        fileList.push(
          writeInputSrcFile(
            subtest.exec,
            test.category,
            test.name,
            { testDir, alterTestDir },
            subtest.name
          )
        );
      });
    } else {
      fileList.push(
        writeInputSrcFile(test.exec, test.category, test.name, {
          testDir,
          alterTestDir,
        })
      );
    }
  });

  if (!testDir) {
    fs.writeFileSync(
      path.join(alterTestDir, "fileinfo.json"),
      JSON.stringify(fileList, null, 2)
    );
    cleanupDirsForRemovedTests(fileList, alterTestDir);
  }
});

function cleanupDirsForRemovedTests(fileList, alterTestDir) {
  const pathSet = new Set(
    fileList.map((file) => path.join(alterTestDir, file.path))
  );
  const files = glob.sync(path.join(alterTestDir, "**/orig.js"), { dot: true });
  const removedDirs = files
    .map(path.dirname)
    .filter((dir) => !pathSet.has(dir));
  removedDirs.forEach((dir) => {
    console.log(`rm: ${path.relative(__dirname, dir)}`);
    rimraf.sync(dir, { glob: false });
  });
}

function init(esVersion) {
  const versions = new Set(["es6", "es2016plus", "esnext"]);
  if (!versions.has(esVersion)) {
    throw new Error(`ES_VERSION is invalid: ${esVersion}`);
  }
  const testDir = process.env.TEST_DIR;
  const alterTestDir = path.join(__dirname, "alter-tests", esVersion);
  mkdirp.sync(alterTestDir);
  const data = require(`./compat-table/data-${esVersion}`);
  return { testDir, alterTestDir, data };
}

function writeInputSrcFile(fn, category, test, { testDir, alterTestDir }, sub) {
  let dir = path.join(alterTestDir, escapePath(category), escapePath(test));
  let name = `${category} / ${test}`;
  if (sub) {
    dir = path.join(dir, escapePath(sub));
    name = `${name} / ${sub}`;
  }
  if (testDir && !`${dir}/`.includes(testDir)) {
    return;
  }
  const origPath = path.join(dir, "orig.js");
  generateTestJsSrc(fn, name, origPath);
  return {
    path: path.relative(alterTestDir, dir),
    category,
    test,
    subtest: sub,
  };
}

function escapePath(str) {
  // valid: #$%=~-,_.+
  // invalid: [](){}`^~|@;:`*?"<>
  return str
    .replace("\u{2E2F}", "U+2E2F")
    .replace("\u{102C0}", "U+102C0")
    .replace(/<\/?code>/g, "")
    .replace(/=>/g, "arrow")
    .replace(/['"]/g, "")
    .replace(/ \(([^)]+)\)]/g, " $1")
    .replace("||=", "Or Or Equals")
    .replace("&&=", "And And Equals")
    .replace("??=", "QQ Equals")
    .replace(/[ [\](){}<>`^~|@;:`*?/]/g, "_");
}

function format(src) {
  try {
    const { output } = linter.verifyAndFix(src, {
      parserOptions: {
        ecmaVersion: 2018,
      },
      rules: {
        indent: ["error", 2],
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
  if (typeof fn === "function") {
    const testCode = createTestCode(fn, name);
    const existingSrc = getExistigSrc(origPath);
    if (existingSrc) {
      if (existingSrc === testCode.toString()) {
        return;
      } else {
        console.error("changed test:", name);
      }
    }
    mkdirp.sync(path.dirname(origPath));
    fs.writeFileSync(origPath, testCode.toString());
  } else if (Array.isArray(fn) && fn.length > 0) {
    // NOTE: not used now
    // it's an array of objects like the following:
    // { type: 'application/javascript;version=1.8', script: function () { ... } }
    throw new Error(`${name}: test is an array`);
  } else {
    throw new Error(`${name}: unknown test type :${fn}`);
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
  expr = expr.replace(/^\s*/gm, "");
  return new TestCode(expr, name);
}

function getExistigSrc(origPath) {
  try {
    return fs.readFileSync(origPath, "utf8");
  } catch {
    return null;
  }
}
