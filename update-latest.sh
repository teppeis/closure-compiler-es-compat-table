#!/bin/sh

if [ $# -ne 1 ]; then
    {
        echo "Usage: update-latest.sh CLOSURE_VERSION"
        echo "  - CLOSURE_VERSION: ex. 'v20180402'"
    } 1>&2
    exit 1
fi

clVersion=$1

for esVersion in es6 es2016plus esnext; do
    rm -rf "$esVersion/latest"
    cp -rf "$esVersion/$clVersion" "$esVersion/latest"
    ./result2md.mjs "$esVersion/latest/result.txt" > "$esVersion/latest/fail.md"
    git add "$esVersion/latest"
done
git commit -m "copy $clVersion to latest"
