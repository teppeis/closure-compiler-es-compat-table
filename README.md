# ECMAScript compatibility checker for Closure Compiler

[![Build Status](https://travis-ci.org/teppeis/closure-compiler-es-compat-table.svg?branch=master)](https://travis-ci.org/teppeis/closure-compiler-es-compat-table)

Run [kangax's ES compat-table tests](https://kangax.github.io/compat-table/es6/) for [Google Closure Compiler](https://github.com/google/closure-compiler).

Also see [ECMAScript compatibility tracking issue · Issue \#2899 · google/closure\-compiler](https://github.com/google/closure-compiler/issues/2899)

## Setup

```console
$ git clone https://github.com/teppeis/closure-compiler-es-compat-table.git
$ git submodule --init update
$ npm install
```

## Update tests

Import new tests from `compat-table`

```console
$ ./update-tests.js
```

## Run tests and update result

```console
$ ./runjs es6             # use current installed google-closure-compiler
$ ./runjs es6/v20180402   # use google-closure-compiler@20180402
$ ./runjs es6/v20180402/syntax
$ ./runjs es6/v20180402/syntax/rest_parameters
$ ./runjs es6/v20180402/syntax/rest_parameters/basic_functionality
```

## Update `latest`

```console
$ ./update-latest.sh v20180402
```
