#!/bin/bash -e

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    {
        echo "Usage: compile.sh ES_VERSION [TEST_DIR]"
        echo "  - ES_VERSION: ex. 'es2016plus'"
        echo "  - TEST_DIR  : ex. '2016_features/exponentiation_operator/basic_support'"
    } 1>&2
    exit 1
fi
ES_VERSION=$1
TEST_DIR=$2
COMPILATION_LEVEL=${COMPILATION_LEVEL:-SIMPLE}

basedir=$(cd "$(dirname "$0")" && pwd)
closure="$basedir/node_modules/.bin/closure-gun"
closureVer=$("$basedir/get-closure-version.sh")

BUILD_DIR="$basedir/$ES_VERSION/$closureVer"

if [ -n "$TEST_DIR" ]; then
    BUILD_DIR="$BUILD_DIR/$TEST_DIR"
fi

for FILE in $(find "$BUILD_DIR" -type f -name in.js | sort); do
    DIR=$(dirname "$FILE")
    DIR_DISPLAY="${DIR//*$closureVer\//}"
    OUT="$DIR/out.js"
    $closure \
        --formatting PRETTY_PRINT \
        -O "$COMPILATION_LEVEL" \
        --language_in ECMASCRIPT_NEXT \
        --language_out ECMASCRIPT5 \
        --js "$FILE" \
        > "$OUT" 2> ./error || true

    # exit code of JNI is wrong
    if [ "$(cat ./error)" != "" ]; then
        echo "- $DIR_DISPLAY: NG"

        if [ "$(cat "$OUT")" = "" ]; then
            rm "$OUT"
        fi

        ERRORLOG="$DIR/error.txt"
        # shellcheck disable=SC2129
        {
            cat "$DIR/in.js" 
            echo ""
            echo "----------------------------------------------------------"
            cat ./error
        } > "$ERRORLOG"
    else
        echo "- $DIR_DISPLAY: OK"
    fi
done

rm -f ./error
