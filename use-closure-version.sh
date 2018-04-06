#!/bin/bash -e

if [ $# -ne 1 ]; then
    {
        echo "Usage: change-version.sh CLOSURE_VERSION"
        echo "  - CLOSURE_VERSION: ex. 'v20180402'"
    } 1>&2
    exit 1
fi
targetVer=$1

basedir=$(cd "$(dirname "$0")" && pwd)
closureGunDir="$basedir/node_modules/closure-gun"

if [ ! -d "$closureGunDir" ]; then
    npm i
fi

currentVer=$("$basedir/get-closure-version.sh")

if [ "$currentVer" = "$targetVer" ]; then
    exit
fi

# stop current process
npm run --silent stop > /dev/null 2>&1 || true

cacheDir="$basedir/.closure-gun-cache"
mkdir -p "$cacheDir"
rm -rf "${cacheDir:?}/$currentVer"
mv "$closureGunDir" "$cacheDir/$currentVer"

if [ -d "$cacheDir/$targetVer" ]; then
    mv "$cacheDir/$targetVer" "$closureGunDir"
else
    npm i --no-save "google-closure-compiler@$targetVer"
fi
