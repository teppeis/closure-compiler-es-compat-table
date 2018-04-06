#!/bin/bash -e

basedir=$(cd "$(dirname "$0")" && pwd)
closureGun="$basedir/node_modules/.bin/closure-gun"
if [ ! -f "$closureGun" ]; then
    echo "closure-gun is not installed. run 'npm install'" 1>&2
    exit 1
fi

"$closureGun" --version | grep Version | sed -e 's/Version: //g'
