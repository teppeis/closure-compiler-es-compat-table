#!/bin/sh

JAVA=./node_modules/fast-closure-compiler/bin/closure

for DIR in $(ls ./build); do
    DIR=./build/$DIR
    echo "- $DIR"
    $JAVA --language_in ECMASCRIPT6 --language_out ECMASCRIPT3 --formatting PRETTY_PRINT -O SIMPLE --js "$DIR/in.js" > $DIR/out.js
done
