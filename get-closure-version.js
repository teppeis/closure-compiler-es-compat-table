#!/usr/bin/env node

'use strict';

const {version} = require('google-closure-compiler/package.json');
const semver = require('semver');

let major = `v${semver.major(version)}`;
if (version.endsWith('-nightly')) {
  major = 'nightly';
}
if (require.main === module) {
  console.log(major);
} else {
  module.exports = major;
}
