#!/bin/bash -e

reset () {
    echo "update $1"
    rm -rf "$1"
    ./run.mjs "$1"
    git add "$1"
    git ci -m "update $1"
}

reset_closure () {
    clVer=$1
    reset "es6/$clVer"
    reset "es2016plus/$clVer"
    reset "esnext/$clVer"
}

reset_es () {
    esVer=$1
    find "$esVer" -type d -depth 1 -name 'v*' -print0 | sort -zr | while IFS= read -r -d $'\0' dir; do
        reset "$dir"
    done
}

reset_closure v20180402
reset_closure v20180319
reset_closure v20180204
