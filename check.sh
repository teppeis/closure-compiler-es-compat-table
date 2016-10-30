#!/bin/sh

JAVA=./node_modules/.bin/closure-gun

VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $VERSION
LOG=./result/$VERSION.txt
rm -f $LOG
nodebrew exec 0.10 -- node ./check.js > $LOG
