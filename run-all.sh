#!/bin/sh

set -ex

version=v20190909

AWS=1 ./run.js esnext/$version
AWS=1 ./run.js es2016plus/$version
AWS=1 ./run.js es6/$version
git add .
git ci -m "add result $version"

./update-latest.sh $version
