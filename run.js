#!/usr/bin/env node

const meow = require('meow');
const path = require('path');
const execa = require('execa');

const cli = meow(`
	Usage
	  $ run.js TARGET

	Examples
    $ ./runjs es6
    $ ./runjs es6/v20180402
    $ ./runjs es6/v20180402/syntax/rest_parameters/basic_functionality
`, {
	flags: {
	}
});

if (cli.input.length !== 1) {
  cli.showHelp();
}

const match = /^([^/]+)(?:\/(v\d+))?(?:\/(.*))?/.exec(cli.input[0]);
let [, esVer, closureVer, targetDir] = match;

if (!esVer) {
  cli.showHelp();
}

const opts = {
  stdio: 'inherit',
  cwd: __dirname
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
  await execa('node', ['generate-inputs.js'], {
    ...opts,
    env: {
      ES_VERSION: esVer,
      CL_VERSION: closureVer,
      TEST_DIR: targetDir,
    }
  });
  console.log('Compile');
  await execa('./compile.sh', [esVer, targetDir], opts);
  console.log('Check');
  await execa('./check.sh', [esVer, targetDir], opts);
  console.log('Cleanup');
  await execa('./clean-path.sh', [esVer], opts);
})();
