'use strict';

const {faastAws, faastLocal} = require('faastjs');
const funcs = require('./functions');
const path = require('path');
const fs = require('fs').promises;
const globby = require('globby');
const del = require('del');

if (process.argv.length < 3) {
  throw new Error('An argument required. ex) es2016plus/v20190415');
}
const dir = process.argv[2];
const targetDir = path.resolve(process.cwd(), dir);
const targetDirRelative = path.relative(path.resolve(__dirname, '..'), targetDir);
const [, version] = /v(\d{8})\/?$/.exec(targetDir) || [];
if (!version) {
  throw new Error(`An argument required. ex) es2016plus/v20190415, but ${dir}`);
}

(async () => {
  const commonOpts = {
    addDirectory: [targetDir],
    packageJson: {
      dependencies: {
        [`google-closure-compiler-${process.env.AWS ? 'linux' : 'osx'}`]: version,
      },
    },
    webpackOptions: {
      externals: [
        new RegExp('^aws-sdk/?'),
        'google-closure-compiler-js',
        'google-closure-compiler-linux',
        'google-closure-compiler-osx',
      ],
    },
  };
  const m = process.env.AWS
    ? await faastAws(funcs, {
        ...commonOpts,
        region: 'ap-northeast-1',
        awsLambdaOptions: {
          Runtime: 'nodejs10.x',
        },
      })
    : await faastLocal(funcs, commonOpts);
  await del(`${targetDir}/**/(out.js|error.txt)`, {dot: true});
  // const files = [
  //   targetDir + '/2016_features/Array.prototype.includes/Array.prototype.includes/in.js',
  //   targetDir + '/2018_features/RegExp_named_capture_groups/in.js',
  // ];
  // const files = [`${targetDir}/2016_misc/Proxy,_enumerate_handler_removed/in.js`];
  const files = await globby(`${targetDir}/**/in.js`, {dot: true});
  const total = files.length;
  let done = 0;
  const promises = files.map(input => {
    const output = path.join(path.dirname(input), 'out.js');
    const errorFile = path.join(path.dirname(input), 'error.txt');
    return m.functions
      .compile({
        js: [path.relative(targetDir, input)],
        // compilation_level: 'ADVANCED',
        compilation_level: 'SIMPLE',
        formatting: ['PRETTY_PRINT'],
        // debug: true,
        language_in: 'ECMASCRIPT_NEXT',
        language_out: 'ECMASCRIPT5',
      })
      .then(
        async result => {
          if (result[0].error) {
            await writeError(input, errorFile, result[0].error);
          }
          return fs.writeFile(output, result[0].src);
        },
        async e => {
          const message = e
            .split('\n')
            .slice(2) // Remove error headers
            .join('\n');
          return writeError(input, errorFile, message);
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
  const relative = path.relative(targetDir, path.dirname(path.dirname(inputFile)));
  const fullpath = path.join(targetDirRelative, relative);
  const body = `
----------------------------------------------------------
${message.trimEnd().replace(new RegExp(relative, 'g'), fullpath)}
`;
  return fs.writeFile(errorFile, body, {flag: 'a'});
}
