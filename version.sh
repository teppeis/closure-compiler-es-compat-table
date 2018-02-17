#!/bin/sh

java -jar ./node_modules/google-closure-compiler/compiler.jar --version | grep Version | sed -e 's/Version: //g'
