#!/bin/bash -e

if [ $# -lt 1 ]; then
    {
        echo "Usage: clean-path.sh ES_VERSION"
        echo "  - ES_VERSION: ex. 'es2016plus'"
    } 1>&2
    exit 1
fi
ES_VERSION=$1

basedir=$(cd "$(dirname "$0")" && pwd)
pkgname=$(basename "$basedir")
closureVer=$("$basedir/get-closure-version.sh")
DIR="$basedir/$ES_VERSION/$closureVer"

grep -l -r "/$pkgname/" "$DIR" | xargs sed -i "" -e "s%[^ (]*/$pkgname/%%g"
