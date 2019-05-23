#!/usr/bin/env node

'use strict';

const {version} = require('google-closure-compiler/package.json');
if (version.endsWith('-nightly')) {
  console.log('nightly');
} else {
  console.log(version);
}
