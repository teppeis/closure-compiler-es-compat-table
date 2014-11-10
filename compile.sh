#!/bin/sh

JAVA=./node_modules/fast-closure-compiler/bin/closure

VERSION=$($JAVA --version|grep Version|sed -e 's/Version: //g')
echo $VERSION
ERRORLOG=./result/$VERSION.error.txt
rm $ERRORLOG

for DIR in $(ls -I filelist.json -v ./build); do
    DIR=./build/$DIR
    $JAVA --language_in ECMASCRIPT6 --language_out ECMASCRIPT3 --formatting PRETTY_PRINT -O SIMPLE --js "$DIR/in.js" > $DIR/out.js 2> ./error
    # exit code of JNI is wrong
    if [ "$(cat ./error)" != "" ]; then
        echo "- $DIR: NG"

        cat $DIR/in.js >> $ERRORLOG
        echo "" >> $ERRORLOG
        cat ./error >> $ERRORLOG
        echo "" >> $ERRORLOG
    else
        echo "- $DIR: OK"
    fi
done

rm error

exit 0
