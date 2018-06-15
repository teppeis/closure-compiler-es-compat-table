ECMAScript compatibility checker for Closure Compiler
====

Run [kangax's ES compat-table tests](https://kangax.github.io/compat-table/es6/) and store the results.

## Setup

```console
$ git clone https://github.com/teppeis/closure-compiler-es-compat-table.git
$ git submodule --init update
$ npm install
```

### Required

- Node.js v8+
- Java 8+
- GCC to compile [Nailgun](http://martiansoftware.com/nailgun/)

## Update tests

Import new tests from `compat-table`

```console
$ ./update-tests.js es6
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
