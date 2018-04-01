#!/bin/bash -e

if [ $# -ne 1 ]; then
    echo "Usage: check.sh ES_VERSION" 1>&2
    exit 1
fi
ES_VERSION=$1

basedir=$(cd "$(dirname "$0")" && pwd)
closureVer=$("$basedir/version.sh")
echo "$closureVer"

LOG="$basedir/$ES_VERSION/$closureVer/result.txt"
ERROR="$basedir/$ES_VERSION/$closureVer/runtime_error.txt"
rm -f "$LOG"
nodebrew exec 0.10 -- ES_VERSION="$ES_VERSION" CL_VERSION="$closureVer" node "$basedir/legacy/check.js" > "$LOG" 2> "$ERROR"
