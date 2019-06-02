#!/bin/bash

sedi=(-i)
case "$(uname)" in
  # For macOS
  Darwin*) sedi=(-i "")
esac

find ./es6 ./es2016plus ./esnext -type f -name 'error.txt' -print0 | xargs -0 sed "${sedi[@]}" -e 's/\$\$Lambda\$[^.]*/$$Lambda$<REPLACED>/g'
