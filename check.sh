#!/bin/sh

JAVA=./node_modules/.bin/closure-gun

export CL_VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $CL_VERSION
LOG=./$ES_VERSION/result/$CL_VERSION.txt
rm -f $LOG
nodebrew exec 0.10 -- node ./check.js > $LOG
