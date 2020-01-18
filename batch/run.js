"use strict";

const { faastAws, faastLocal } = require("faastjs");
const funcs = require("./functions");
const path = require("path");
const fs = require("fs").promises;
const glob = require("glob");
const del = require("del");

if (process.argv.length < 3) {
  throw new Error("An argument required. ex) es2016plus/v20190415");
}
const dir = process.argv[2];
const targetDir = path.resolve(process.cwd(), dir);
const cwd = path.resolve(__dirname, "..");
const [, version] = /\/([^/]*)\/?$/.exec(targetDir) || [];
if (!version) {
  throw new Error(`An argument required. ex) es2016plus/v20190415, but ${dir}`);
}

const { platform } = process;
let nativeImageOsSuffix;
if (process.env.AWS || platform === "linux") {
  nativeImageOsSuffix = "linux";
} else if (platform === "darwin") {
  nativeImageOsSuffix = "osx";
} else {
  throw new Error(`Unsuported Platform: ${platform}`);
}

// work around for faast.js that doesn't have an option to expand dot files
const dotDirs = glob.sync(`${targetDir}/**/.*/`, { dot: true });

(async () => {
  const commonOpts = {
    include: [{ path: targetDir, cwd }]
      .concat(dotDirs.map(dir => ({ path: dir, cwd })))
      .map(({ path: dir, cwd }) => ({ path: path.relative(cwd, dir), cwd })),
    packageJson: {
      dependencies: {
        [`google-closure-compiler-${nativeImageOsSuffix}`]: version,
      },
    },
    webpackOptions: {
      resolve: {
        alias: {
          "google-closure-compiler-java": path.resolve(
            __dirname,
            "google-closure-compiler-java-dummy.js"
          ),
        },
      },
      externals: [
        new RegExp("^aws-sdk/?"),
        // include only compiler and compiler-java
        "google-closure-compiler-js",
        "google-closure-compiler-linux",
        "google-closure-compiler-osx",
        "google-closure-compiler-windows",
        // not used in this script
        "gulp-util",
      ],
    },
  };
  console.log(commonOpts);
  const m = process.env.AWS
    ? await faastAws(funcs, {
        ...commonOpts,
        region: "ap-northeast-1",
        awsLambdaOptions: {
          Runtime: "nodejs10.x",
        },
      })
    : await faastLocal(funcs, commonOpts);
  await del(`${targetDir}/**/(out.js|error.txt)`, { dot: true });
  // const files = [
  //   targetDir + '/2016_features/Array.prototype.includes/Array.prototype.includes/in.js',
  //   targetDir + '/2018_features/RegExp_named_capture_groups/in.js',
  // ];
  // const files = [`${targetDir}/2016_misc/Proxy,_enumerate_handler_removed/in.js`];
  const files = glob.sync(`${targetDir}/**/in.js`, { dot: true });
  const total = files.length;
  let done = 0;
  const promises = files.map(input => {
    const output = path.join(path.dirname(input), "out.js");
    const errorFile = path.join(path.dirname(input), "error.txt");
    return m.functions
      .compile({
        js: [path.relative(process.cwd(), input)],
        // compilation_level: 'ADVANCED',
        compilation_level: "SIMPLE",
        formatting: ["PRETTY_PRINT"],
        // debug: true,
        language_in: "ECMASCRIPT_NEXT",
        language_out: "ECMASCRIPT5",
      })
      .then(
        async result => {
          if (result[0].error) {
            await writeError(input, errorFile, result[0].error);
          }
          return fs.writeFile(output, result[0].src);
        },
        async e => {
          if (typeof e === "string") {
            const message = e
              .split("\n")
              .slice(2) // Remove error headers
              .join("\n");
            return writeError(input, errorFile, message);
          } else {
            console.error(e);
          }
        }
      )
      .finally(() => {
        console.log(`[${++done}/${total}] ${input}`);
      });
  });
  try {
    // console.log('cat package.json', await m.functions.exec('cat package.json'));
    // console.log('ls', await m.functions.exec('ls'));
    // console.log('ls node_modules', await m.functions.exec('ls node_modules'));
    await Promise.all(promises);
  } finally {
    await m.cleanup();
  }
})();

async function writeError(inputFile, errorFile, message) {
  await fs.copyFile(inputFile, errorFile);
  const body = `
----------------------------------------------------------
${message.trimEnd()}
`;
  return fs.writeFile(errorFile, body, { flag: "a" });
}
