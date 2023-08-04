#!/usr/bin/env node

import { execa } from "execa";
import fs from "fs";
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
	  $ run.mjs TARGET

	Options
	  --skip-compile  run only after compile phases
	  --skip-check    run only after check phase

	Examples
    $ ./runjs es6
    $ ./runjs es6/v20180402
    $ ./runjs es6/v20180402/syntax/rest_parameters/basic_functionality
`,
  {
    importMeta: import.meta,
    flags: {
      skipCompile: {
        type: "boolean",
        default: false,
      },
      skipCheck: {
        type: "boolean",
        default: false,
      },
    },
  },
);

if (cli.input.length !== 1) {
  cli.showHelp();
}

const { skipCompile, skipCheck } = cli.flags;
const match = /^([^/]+)(?:\/([^/]+))?(?:\/(.*))?/.exec(cli.input[0]);
// eslint-disable-next-line prefer-const
let [, esVer, closureVer, targetDir] = match;

if (!esVer) {
  cli.showHelp();
}

const opts = {
  stdio: "inherit",
  cwd: __dirname,
};

(async () => {
  if (!closureVer) {
    closureVer = require("./get-closure-version.js");
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
})();
