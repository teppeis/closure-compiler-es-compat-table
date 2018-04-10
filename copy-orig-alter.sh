#!/bin/bash -ex

if [ $# -lt 1 ]; then
    {
        echo "Usage: $(basename "$0") PATH"
    } 1>&2
    exit 1
fi
dir=$1
while IFS= read -r -d '' file; do
    cp "$file" "${file/orig.js/alter.js}"
done <   <(find "$dir" -name 'orig.js' -print0)
