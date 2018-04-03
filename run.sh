#!/bin/bash -e

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    {
        echo "Usage: run.sh ES_VERSION [TEST_DIR]"
        echo "  - ES_VERSION: ex. 'es2016plus'"
        echo "  - TEST_DIR  : ex. '2016_features/exponentiation_operator/basic_support'"
    } 1>&2
    exit 1
fi
ES_VERSION=$1
TEST_DIR=$2

basedir=$(cd "$(dirname "$0")" && pwd)
CL_VERSION=$("$basedir"/version.sh)

ES_VERSION=$ES_VERSION CL_VERSION=$CL_VERSION node generate-inputs.js
"$basedir/compile.sh" "$ES_VERSION" "$TEST_DIR"
"$basedir/check.sh" "$ES_VERSION" "$TEST_DIR"
