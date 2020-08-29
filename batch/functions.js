"use strict";

const child_process = require("child_process");
const fs = require("fs").promises;
const { compiler: Compiler } = require("google-closure-compiler");
const { getNativeImagePath } = require("google-closure-compiler/lib/utils");
const { promisify } = require("util");

async function compile(options) {
  options = { ...options, json_streams: "OUT" };
  const compiler = new Compiler(options);
  // use native binary
  compiler.JAR_PATH = null;
  compiler.javaPath = getNativeImagePath();
  // To fix bug since google-closure-compiler@20200820
  await fs.chmod(compiler.javaPath, 0o755);
  return new Promise((resolve, reject) => {
    compiler.run((exitCode, stdout, stderr) => {
      if (exitCode === 0) {
        const result = JSON.parse(stdout);
        resolve([
          {
            ...result[0],
            error: stderr,
          },
        ]);
      } else {
        reject(stderr);
      }
    });
  });
}

async function exec(command) {
  const { stdout } = await promisify(child_process.exec)(command);
  return stdout;
}

module.exports = {
  compile,
  exec,
};
