#!/bin/sh

# TEST_DIR=44 if you want to run only specified test

JAVA=./node_modules/.bin/closure-gun

VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $VERSION
ERRORLOG=./result/$VERSION.error.txt
rm -f $ERRORLOG

for DIR in $(ls ./build|grep -v filelist.json|sort -n); do

    if [ -n "$TEST_DIR" ] && [ $DIR != $TEST_DIR ]; then
        continue
    fi

    DIR=./build/$DIR

    $JAVA \
        --language_in ECMASCRIPT6 \
        --language_out ECMASCRIPT5 \
        --rewrite_polyfills \
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
