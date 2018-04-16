#!/bin/sh -e

reset () {
    rm -rf "$1"
    ./run.js "$1"
    git add "$1"
    git ci -m "update $1"
}

reset es6/v20180402
reset es2016plus/v20180402
reset esnext/v20180402

reset es6/v20180319
reset es2016plus/v20180319
reset esnext/v20180319

reset es6/v20180204
reset es2016plus/v20180204
reset esnext/v20180204
