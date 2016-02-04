#!/bin/sh

JAVA=./node_modules/.bin/closure-gun

VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $VERSION
LOG=./result/$VERSION.txt
rm -f $LOG
node ./check.js > $LOG
