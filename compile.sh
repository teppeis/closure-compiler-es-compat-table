#!/bin/bash -e

# TEST_DIR=44 if you want to run only specified test

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
    echo "Usage: compile.sh ES_VERSION [TEST_DIR]" 1>&2
    exit 1
fi
ES_VERSION=$1
TEST_DIR=$2

basedir=$(cd "$(dirname "$0")" && pwd)
closure="$basedir/node_modules/.bin/closure-gun"
closureVer=$("$basedir/version.sh")
echo "$closureVer"

BUILD_DIR="$basedir/$ES_VERSION/$closureVer"

for FILE in $(find "$BUILD_DIR" -type f -name in.js | sort); do
    # TODO: TEST_DIR
    if [ -n "$TEST_DIR" ] && [ "$DIR" != "$TEST_DIR" ]; then
        continue
    fi

    DIR=$(dirname "$FILE")
    DIR_DISPLAY="${DIR//*$closureVer\//}"
    OUT="$DIR/out.js"
    $closure \
        --formatting PRETTY_PRINT \
        -O SIMPLE \
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
