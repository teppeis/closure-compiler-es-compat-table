#!/bin/sh

JAVA=java
type drip > /dev/null
if [ $? = 0 ]; then
    JAVA=drip
fi

for DIR in $(ls ./build); do
    DIR=./build/$DIR
    echo "- $DIR"
    $JAVA -jar compiler.jar --language_in ECMASCRIPT6 --language_out ECMASCRIPT3 --formatting PRETTY_PRINT -O SIMPLE --js "$DIR/in.js" > $DIR/out.js
done
