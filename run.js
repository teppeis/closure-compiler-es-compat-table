#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const execa = require('execa');

const cli = meow(
  `
	Usage
	  $ run.js TARGET

	Options
	  --skip-compile  run only after compile phases
	  --skip-check    run only after check phase

	Examples
    $ ./runjs es6
    $ ./runjs es6/v20180402
    $ ./runjs es6/v20180402/syntax/rest_parameters/basic_functionality
`,
  {
    flags: {
      skipCompile: {
        type: 'boolean',
        default: false,
      },
      skipCheck: {
        type: 'boolean',
        default: false,
      },
    },
  }
);

if (cli.input.length !== 1) {
  cli.showHelp();
}

const {skipCompile, skipCheck} = cli.flags;
const match = /^([^/]+)(?:\/([^/]+))?(?:\/(.*))?/.exec(cli.input[0]);
// eslint-disable-next-line prefer-const
let [, esVer, closureVer, targetDir] = match;

if (!esVer) {
  cli.showHelp();
}

const opts = {
  stdio: 'inherit',
  cwd: __dirname,
};

(async () => {
  if (!closureVer) {
    closureVer = await execa.stdout('./get-closure-version.js', {...opts, stdio: 'pipe'});
    if (!closureVer) {
      throw new Error(closureVer);
    }
  } else {
    await execa('./use-closure-version.sh', [closureVer], opts);
  }
  targetDir = targetDir || '';
  if (!skipCompile && !skipCheck) {
    console.log(`Target: ${esVer}/${closureVer}${targetDir ? `/${targetDir}` : ''}`);
    console.log('Generate inputs');
    await execa('./generate-inputs.js', [], {
      ...opts,
      env: {
        ES_VERSION: esVer,
        CL_VERSION: closureVer,
        TEST_DIR: targetDir,
      },
    });
    if (targetDir) {
      console.log('Compile (Java)');
      await execa('./compile.sh', [esVer, targetDir], opts);
    } else {
      const env = {};
      if (process.env.AWS) {
        console.log('Compile (AWS)');
        env.AWS = 1;
      } else {
        console.log('Compile (Native)');
      }
      await execa('node', ['./batch/run.js', path.join(esVer, closureVer)], {...opts, env});
    }
  }
  if (!skipCheck) {
    console.log('Check');
    await execa('./check.sh', [esVer, targetDir], opts);
  }
  console.log('Generate fail.md');
  const {stdout} = await execa('./result2md.js', [path.join(esVer, closureVer, 'result.txt')], {
    cwd: __dirname,
  });
  fs.writeFileSync(path.join(__dirname, esVer, closureVer, 'fail.md'), stdout);
})();
