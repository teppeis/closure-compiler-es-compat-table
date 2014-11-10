#!/bin/sh

JAVA=./node_modules/fast-closure-compiler/bin/closure

VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $VERSION
LOG=./result/$VERSION.txt
rm -f $LOG
node ./check.js > $LOG
