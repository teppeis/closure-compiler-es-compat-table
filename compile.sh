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

basedir=$(cd "$(dirname "$0")" && pwd)
closure="$basedir/node_modules/.bin/closure-gun"
closureVer=$("$basedir/get-closure-version.js")
pkgname=$(basename "$basedir")

BUILD_DIR="$basedir/$ES_VERSION/$closureVer"

if [ -n "$TEST_DIR" ]; then
    BUILD_DIR="$BUILD_DIR/$TEST_DIR"
fi

COMPILATION_LEVEL=${COMPILATION_LEVEL:-SIMPLE}
case "$O" in
  1 ) COMPILATION_LEVEL="WHITESPACE_ONLY" ;;
  2 ) COMPILATION_LEVEL="SIMPLE" ;;
  3 ) COMPILATION_LEVEL="ADVANCED" ;;
esac

if [ "$RUNTIME" = 1 ]; then
    forceInject="--force_inject_library es6_runtime"
fi
# shellcheck disable=SC2153
if [ "$DEBUG" = 1 ]; then
    debug="--debug"
fi

errorTmp=$(mktemp)
for FILE in $(find "$BUILD_DIR" -type f -name in.js | sort); do
    DIR=$(dirname "$FILE")
    DIR_DISPLAY="${DIR//*$closureVer\//}"
    OUT="$DIR/out.js"
    ERRORLOG="$DIR/error.txt"
    rm -rf "$ERRORLOG"
    # shellcheck disable=SC2086
    $closure $forceInject $debug \
        --formatting PRETTY_PRINT \
        -O "$COMPILATION_LEVEL" \
        --language_in ECMASCRIPT_NEXT \
        --language_out ECMASCRIPT5 \
        --js "$FILE" \
        2> "$errorTmp" \
        | sed -e "s%[^ (]*/$pkgname/%%g" > "$OUT" || true

    # exit code of JNI is wrong
    if [ "$(cat "$errorTmp")" != "" ]; then
        echo "- $DIR_DISPLAY: NG"

        if [ "$(cat "$OUT")" = "" ]; then
            rm "$OUT"
        fi

        # shellcheck disable=SC2129
        {
            cat "$DIR/in.js" 
            echo ""
            echo "----------------------------------------------------------"
            cat "$errorTmp"
        } | sed -e "s%[^ (]*/$pkgname/%%g" \
            > "$ERRORLOG"
    else
        echo "- $DIR_DISPLAY: OK"
    fi
done

rm -f "$errorTmp"
