#!/bin/sh

find ./es6 ./es2016plus ./esnext -type f -name 'error.txt' -print0 | xargs -0 sed -e 's/\$\$Lambda\$[^.]*/$$Lambda$<REPLACED>/g' -i ''
