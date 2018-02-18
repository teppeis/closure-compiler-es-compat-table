#!/bin/sh

# TEST_DIR=44 if you want to run only specified test

JAVA=./node_modules/.bin/closure-gun

CL_VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $CL_VERSION
mkdir -p ./$ES_VERSION/result
ERRORLOG=./$ES_VERSION/result/$CL_VERSION.error.txt
BUILD_DIR=./$ES_VERSION/$CL_VERSION/build
rm -f $ERRORLOG

for DIR in $(ls $BUILD_DIR | grep -v filelist.json | sort -n); do

    if [ -n "$TEST_DIR" ] && [ $DIR != $TEST_DIR ]; then
        continue
    fi

    DIR=$BUILD_DIR/$DIR

    $JAVA \
        --formatting PRETTY_PRINT \
        -O SIMPLE \
        --js "$DIR/in.js" \
        > $DIR/out.js 2> ./error

    # exit code of JNI is wrong
    if [ "$(cat ./error)" != "" ]; then
        echo "- $DIR: NG"

        cat $DIR/in.js >> $ERRORLOG
        echo "" >> $ERRORLOG
        cat ./error >> $ERRORLOG
        echo "--------------------------------------------------------------------------------" >> $ERRORLOG
    else
        echo "- $DIR: OK"
    fi
done

rm -f error

exit 0
