#!/bin/bash -eu

if [ $# -lt 1 ] || [ $# -gt 1 ]; then
    {
        echo "Usage: $(basename "$0") CLOSURE_VERSION"
        echo "  - CLOSURE_VERSION: ex. v20180402, 1.0-SNAPSHOT"
    } 1>&2
    exit 1
fi

targetVer=$1

basedir=$(cd "$(dirname "$0")" && pwd)

currentVer=$("$basedir/get-closure-version.js" 2> /dev/null)

if [ "$currentVer" = "$targetVer" ]; then
    exit
fi

# stop current process
npm run --silent stop > /dev/null 2>&1 || true

closureDir="$basedir/node_modules/google-closure-compiler"
closureJavaDir="$basedir/node_modules/google-closure-compiler-java"
if [ "$targetVer" = '1.0-SNAPSHOT' ]; then
    targetVer=nightly
fi

cacheDir="$basedir/.closure-gun-cache"

if [ -n "$currentVer" ] && [ "$currentVer" != '1.0-SNAPSHOT' ]; then
    rm -rf "${cacheDir:?}/$currentVer"
    mkdir -p "$cacheDir/$currentVer"
    mv "$closureDir" "$cacheDir/$currentVer/"
    if [ -d "$closureJavaDir" ]; then
        mv "$closureJavaDir" "$cacheDir/$currentVer/"
    fi
fi

if [ -d "$cacheDir/$targetVer" ]; then
    mv "$cacheDir/$targetVer/"* "$basedir/node_modules/"
else
    npm i --no-save "google-closure-compiler@$targetVer"
fi
