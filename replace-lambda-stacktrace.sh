#!/bin/sh

find . -type f -name 'error.txt' -print0 | xargs sed -e 's/\$\$Lambda\$[^.]*/$$Lambda$<REPLACED>/g' -i ''
