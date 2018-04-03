#!/bin/bash -e

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
closureVer=$("$basedir/version.sh")
echo "$closureVer"

LOG="$basedir/$ES_VERSION/$closureVer/pass.txt"
ERROR="$basedir/$ES_VERSION/$closureVer/runtime_error.txt"
rm -f "$LOG"
nodebrew exec 0.10 -- \
    ES_VERSION="$ES_VERSION" \
    CL_VERSION="$closureVer" \
    TEST_DIR="$TEST_DIR" \
    node "$basedir/legacy/check.js" > "$LOG" 2> "$ERROR"
