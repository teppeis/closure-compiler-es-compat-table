#!/bin/sh

clVersion=$1

for esVersion in es6 es2016plus esnext; do
    rm -rf "$esVersion/latest"
    cp -rf "$esVersion/$clVersion" "$esVersion/latest"
    ./result2md.js "$esVersion/latest/result.txt" > "$esVersion/latest/fail.md"
    git add "$esVersion/latest"
done
git commit -m "copy $clVersion to latest"
