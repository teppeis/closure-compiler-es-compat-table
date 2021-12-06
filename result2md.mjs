#!/usr/bin/env node

import fs from "fs";
import humanize from "humanize-string";
import meow from "meow";
import { createRequire } from "module";
import path from "path";
import url from "url";

const require = createRequire(import.meta.url);
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cli = meow(
  `
	Usage
	  $ result2md.mjs RESULT

	Examples
    $ ./result2md.mjs es6/v20180402/result.txt
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
const alterTestDir = path.join(__dirname, "alter-tests", esVersion);
const fileInfo = require(path.join(alterTestDir, "fileinfo.json"));
const resultFile = fs.readFileSync(
  path.join(process.cwd(), resultFilePass),
  "utf8"
);

const failedFileInfo = resultFile
  .split("\n")
  .filter((line) => !!line)
  .map((line) => {
    const match = /^([^:]*): (.*)$/.exec(line);
    if (!match) {
      throw new Error(`Invalid result line: ${line}`);
    }
    const [, out, result] = match;
    return { out, result };
  })
  .filter(({ result }) => result !== "[Pass]")
  .map(({ out, result }) => {
    const dir = path.dirname(out);
    const info = fileInfo.find(({ path }) => path === dir);
    if (!info) {
      throw new Error(`fileInfo not found: ${dir}`);
    }
    const escapedPath = escapeDirAsUrl(out);
    const url = `https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/${esVersion}/${clVersion}/${escapedPath}`;
    return { ...info, result, url };
  });

function escapeDirAsUrl(dir) {
  return dir.split("/").map(encodeURIComponent).join("/");
}

// const output = [`# ES2015`];
const output = [];
const skipPathPrefixes = [
  "subclassing/",
  "built-ins/Proxy/",
  "built-ins/typed_arrays/",
  "misc/Proxy,",
  "2017_features/shared_memory_and_atomics/",
  "2016_misc/Proxy",
  "2017_misc/Proxy",
  "2017_annex_b/Proxy",
];
const skipPaths = new Set([
  "built-ins/Reflect/Reflect.construct,_Array_subclassing",
  "built-ins/Reflect/Reflect.construct,_RegExp_subclassing",
  "built-ins/Reflect/Reflect.construct,_Function_subclassing",
  "syntax/default_function_parameters/new_Function___support",
  "syntax/rest_parameters/new_Function___support",
  "syntax/destructuring,_parameters/new_Function___support",
  "syntax/destructuring,_parameters/defaults,_new_Function___support",
]);
const refs = [
  {
    pattern: new RegExp("^2018_features/object_rest_spread_properties/"),
    refUrl: "https://github.com/google/closure-compiler/issues/3139",
  },
  {
    pattern: /\biterator_closing\b/,
    refUrl: "https://github.com/google/closure-compiler/issues/2958",
  },
  {
    pattern: new RegExp("/constructor_requires_new$"),
    refUrl: "https://github.com/google/closure-compiler/issues/2919",
  },
  {
    pattern: new RegExp(
      "^built-in_extensions/String_static_methods/String.raw$"
    ),
    refUrl: "https://github.com/google/closure-compiler/issues/3136",
  },
];
let prevCategory = null;
let prevTest = null;
failedFileInfo
  .filter((info) => !!info)
  .filter(
    ({ path }) => !skipPathPrefixes.some((prefix) => path.startsWith(prefix))
  )
  .filter(({ path }) => !skipPaths.has(path))
  .forEach(({ path: testPath, category, test, subtest, url }) => {
    if (prevCategory !== category) {
      output.push(`\n## ${humanize(category)}`);
      prevCategory = category;
    }
    if (prevTest !== test) {
      output.push(`\n### ${test}`);
      prevTest = test;
    }
    let subtestName = subtest;
    if (!subtest) {
      subtestName = test;
    }
    let ref = "";
    const { refUrl } = refs.find((ref) => ref.pattern.test(testPath)) || {};
    if (refUrl) {
      ref = `: ${refUrl}`;
    }
    if (/error\.txt$/.test(url)) {
      // compile error
      output.push(`- ${subtestName} ([compile error](${url}))${ref}`);
    } else {
      // invalid transpile or not implemented
      const input = `${path.dirname(url)}/in.js`;
      output.push(`- ${subtestName} ([in](${input})/[out](${url}))${ref}`);
    }
  });

console.log(output.join("\n"));
