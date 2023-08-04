#!/usr/bin/env node

import { execa } from "execa";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { parseArgs } from "node:util";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function showHelpAndExit() {
  console.error(
    `
Usage
  $ run.mjs TARGET

Options
  --skip-compile  run only after compile phases
  --skip-check    run only after check phase

Examples
  $ ./runjs es6
  $ ./runjs es6/v20180402
  $ ./runjs es6/v20180402/syntax/rest_parameters/basic_functionality`,
  );
  process.exit(1);
}

const { positionals, values } = parseArgs({
  options: {
    skipCompile: { type: "boolean" },
    skipCheck: { type: "boolean" },
    help: { type: "boolean", short: "h" },
  },
  allowPositionals: true,
});

if (positionals.length !== 1 || values.help) {
  showHelpAndExit();
}

const { skipCompile, skipCheck } = values;
const match = /^([^/]+)(?:\/([^/]+))?(?:\/(.*))?/.exec(positionals[0]);
// eslint-disable-next-line prefer-const
let [, esVer, closureVer, targetDir] = match;

if (!esVer) {
  showHelpAndExit();
}

const opts = {
  stdio: "inherit",
  cwd: __dirname,
};

if (!closureVer) {
  closureVer = (await import("./get-closure-version.js")).default;
  if (!closureVer) {
    throw new Error(closureVer);
  }
} else {
  await execa("./use-closure-version.sh", [closureVer], opts);
}
targetDir = targetDir || "";
if (!skipCompile && !skipCheck) {
  console.log(
    `Target: ${esVer}/${closureVer}${targetDir ? `/${targetDir}` : ""}`,
  );
  console.log("Generate inputs");
  await execa("./generate-inputs.js", [], {
    ...opts,
    env: {
      ES_VERSION: esVer,
      CL_VERSION: closureVer,
      TEST_DIR: targetDir,
    },
  });
  if (targetDir) {
    console.log("Compile (Java)");
    await execa("./compile.sh", [esVer, targetDir], opts);
  } else {
    const env = {};
    if (process.env.AWS) {
      console.log("Compile (AWS)");
      env.AWS = 1;
    } else {
      console.log("Compile (Native)");
    }
    await execa("node", ["./batch/run.mjs", path.join(esVer, closureVer)], {
      ...opts,
      env,
    });
  }
}
if (!skipCheck) {
  console.log("Check");
  await execa("./check.sh", [esVer, targetDir], opts);
}
console.log("Generate fail.md");
const { stdout } = await execa(
  "./result2md.mjs",
  [path.join(esVer, closureVer, "result.txt")],
  {
    cwd: __dirname,
  },
);
fs.writeFileSync(path.join(__dirname, esVer, closureVer, "fail.md"), stdout);
