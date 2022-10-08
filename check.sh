#!/usr/bin/env bash

set -e -o pipefail

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    {
        echo "Usage: check.sh ES_VERSION [TEST_DIR]"
        echo "  - ES_VERSION: ex. 'es2016plus'"
        echo "  - TEST_DIR  : ex. '2016_features/exponentiation_operator/basic_support'"
    } 1>&2
    exit 1
fi
ES_VERSION=$1
TEST_DIR=$2

basedir=$(cd "$(dirname "$0")" && pwd)
closureVer=$("$basedir/get-closure-version.js")

resultDir="$basedir/$ES_VERSION/$closureVer"
resultTmp=$(mktemp closure-compat-check-result.XXXXX)
resultFile="$resultDir/result.txt"
rm -f "$LOG"

# `asdf exec` is required.
# This script is called by Node.js process (run.mjs) that is executed by asdf.
# asdf add `~/.asdf/installs/nodejs/16.17.0/bin` to `PATH` of the Node process,
# so `node` without `asdf exec` executes Node v16.17.0
# even if ASDF_NODEJS_VERSION is specified.
ASDF_NODEJS_VERSION=0.10.48 \
    ES_VERSION="$ES_VERSION" \
    CL_VERSION="$closureVer" \
    TEST_DIR="$TEST_DIR" \
    asdf exec node "$basedir/legacy/check.js" > "$resultTmp"

if [ -z "$TEST_DIR" ]; then
    cp "$resultTmp" "$resultFile"
    grep ': \[Pass\]$' "$resultFile" > "$resultDir/pass.txt" || true
else
    cat "$resultTmp"
fi
rm "$resultTmp"
