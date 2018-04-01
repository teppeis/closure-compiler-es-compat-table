#!/bin/bash -e

basedir=$(cd "$(dirname "$0")" && pwd)
"$basedir"/node_modules/.bin/closure-gun --version | grep Version | sed -e 's/Version: //g'
