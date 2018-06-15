#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');
const rimraf = require('rimraf');

const {basedir, testDir, alterTestDir, fileList} = init();

fileList.filter(dir => !testDir || `${dir}/`.includes(testDir)).forEach(dir => {
  const src = getTestSrc(dir);
  const writeDir = path.join(basedir, dir);
  console.log(writeDir);
  mkdirp.sync(writeDir);
  fs.writeFileSync(path.join(writeDir, 'in.js'), src);
});

if (!testDir) {
  fs.writeFileSync(path.join(basedir, 'files.json'), JSON.stringify(fileList, null, 2));
  cleanupDirsForRemovedTests(fileList);
}

function cleanupDirsForRemovedTests(fileList) {
  const pathSet = new Set(fileList.map(file => path.join(basedir, file)));
  const files = glob.sync(path.join(basedir, '**/in.js'));
  const removedDirs = files.map(path.dirname).filter(dir => !pathSet.has(dir));
  removedDirs.forEach(dir => {
    console.log(`rm: ${path.relative(__dirname, dir)}`);
    rimraf.sync(dir, {glob: false});
  });
}

function init() {
  const versionToDir = new Map([
    ['es6', 'es6'],
    ['es2016plus', 'es2016plus'],
    ['esnext', 'esnext'],
  ]);
  const esVersion = versionToDir.get(process.env.ES_VERSION);
  if (!esVersion) {
    throw new Error(`ES_VERSION is invalid: ${process.env.ES_VERSION}`);
  }
  const clVersion = process.env.CL_VERSION;
  if (!clVersion) {
    throw new Error('CL_VERSION is required');
  }
  const basedir = path.join(__dirname, esVersion, clVersion);
  const testDir = process.env.TEST_DIR;
  const alterTestDir = path.join(__dirname, 'alter-tests', esVersion);
  const fileList = require(path.join(alterTestDir, 'fileinfo.json')).map(({path}) => path);
  return {basedir, testDir, alterTestDir, fileList};
}

function getTestSrc(dir) {
  const alterDir = path.join(alterTestDir, dir);
  try {
    return fs.readFileSync(path.join(alterDir, 'alter.js'), 'utf8');
  } catch (ignore) {}
  try {
    return fs.readFileSync(path.join(alterDir, 'orig.js'), 'utf8');
  } catch (ignore) {}
  throw new Error(`test file not found: ${dir}`);
}
