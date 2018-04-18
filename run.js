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

	Examples
    $ ./runjs es6
    $ ./runjs es6/v20180402
    $ ./runjs es6/v20180402/syntax/rest_parameters/basic_functionality
`,
  {
    flags: {},
  }
);

if (cli.input.length !== 1) {
  cli.showHelp();
}

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
    closureVer = await execa.stdout('./get-closure-version.sh', {...opts, stdio: 'pipe'});
    if (!closureVer) {
      throw new Error(closureVer);
    }
  } else {
    await execa('./use-closure-version.sh', [closureVer], opts);
  }
  targetDir = targetDir || '';
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
  console.log('Compile');
  await execa('./compile.sh', [esVer, targetDir], opts);
  console.log('Check');
  await execa('./check.sh', [esVer, targetDir], opts);
  console.log('Generate fail.md');
  const {stdout} = await execa('./result2md.js', [path.join(esVer, closureVer, 'result.txt')], {
    cwd: __dirname,
  });
  fs.writeFileSync(path.join(__dirname, esVer, closureVer, 'fail.md'), stdout);
})();
