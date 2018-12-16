#!/bin/bash -e

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    {
        echo "Usage: $(basename "$0") CLOSURE_VERSION [COMPILER_JAR]"
        echo "  - CLOSURE_VERSION: ex. v20180402, 1.0-SNAPSHOT"
        echo "  - COMPILER_JAR: ex. ../compiler.jar"
    } 1>&2
    exit 1
fi

targetVer=$1
compilerJar=$2

basedir=$(cd "$(dirname "$0")" && pwd)
closureGunDir="$basedir/node_modules/@teppeis/closure-gun"

if [ ! -d "$closureGunDir" ]; then
    npm i
fi

currentVer=$("$basedir/get-closure-version.sh")

if [ "$currentVer" = "$targetVer" ]; then
    exit
fi

# stop current process
npm run --silent stop > /dev/null 2>&1 || true

if [ "$targetVer" = '1.0-SNAPSHOT' ]; then
    if [ -f "$compilerJar" ]; then
        closureDir="$basedir/node_modules/google-closure-compiler"
        mkdir -p "$closureDir"
        cp "$compilerJar" "$closureDir/compiler.jar"
        npm i --no-save @teppeis/closure-gun
        rm -rf "$closureDir"
        exit
    fi
    targetVer=nightly
fi

cacheDir="$basedir/.closure-gun-cache"
mkdir -p "$cacheDir"
rm -rf "${cacheDir:?}/$currentVer"
mv "$closureGunDir" "$cacheDir/$currentVer"

if [ -d "$cacheDir/$targetVer" ]; then
    mv "$cacheDir/$targetVer" "$closureGunDir"
else
    npm i --no-save "google-closure-compiler@$targetVer"
fi
