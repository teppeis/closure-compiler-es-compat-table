#!/bin/bash -e

if [ $# -ne 1 ]; then
    echo "Usage: run.sh ES_VERSION" 1>&2
    exit 1
fi
export ES_VERSION=$1

basedir=$(cd "$(dirname "$0")" && pwd)
CL_VERSION=$("$basedir"/version.sh)
export CL_VERSION

node generate-inputs.js
"$basedir/compile.sh" "$ES_VERSION"
"$basedir/check.sh" "$ES_VERSION"
