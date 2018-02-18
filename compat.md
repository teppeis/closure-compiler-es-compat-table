# ES6: tail call optimization

- direct recursion

```js
"use strict";
function test() {
  return (function f(n){
    if (n <= 0) {
      return  "foo";
    }
    return f(n - 1);
  }(1e6)) === "foo";
}
```

Current output (v20160201):
```js
function test() {
  return "foo" === function b(a) {
    return 0 >= a ? "foo" : b(a - 1);
  }(1E6);
}
```

- mutual recursion

```js
"use strict";
function test() {
  function f(n){
    if (n <= 0) {
      return  "foo";
    }
    return g(n - 1);
  }
  function g(n){
    if (n <= 0) {
      return  "bar";
    }
    return f(n - 1);
  }
  return f(1e6) === "foo" && f(1e6+1) === "bar";
}
```

Current output (v20160201):
```js
function test() {
  function b(a) {
    if (0 >= a) {
      return "foo";
    }
    --a;
    a = 0 >= a ? "bar" : b(a - 1);
    return a;
  }
  return "foo" === b(1E6) && "bar" === b(1000001);
}
```

# ES6: arguments object interaction

- default function params

```js
"use strict";
function test() {
  return (function (a = "baz", b = "qux", c = "quux") {
    a = "corge";
    // The arguments object is not mapped to the
    // parameters, even outside of strict mode.
    return arguments.length === 2
      && arguments[0] === "foo"
      && arguments[1] === "bar";
  }("foo", "bar"));
}
```

Current output (v20160201):

```js
function test() {
  return function(a, b, c) {
    a = void 0 === a ? "baz" : a;
    b = void 0 === b ? "qux" : b;
    c = void 0 === c ? "quux" : c;
    a = "corge";
    return 2 === arguments.length && "foo" === arguments[0] && "bar" === arguments[1];
  }("foo", "bar");
};
```

- rest params

```js
"use strict";
function test() {
  return (function (foo, ...args) {
    foo = "qux";
    // The arguments object is not mapped to the
    // parameters, even outside of strict mode.
    return arguments.length === 3
      && arguments[0] === "foo"
      && arguments[1] === "bar"
      && arguments[2] === "baz";
  }("foo", "bar", "baz"));
}
```

# ES6 function 'length' property (rest params)

```js
"use strict";
function test() {
  return function(a, ...b){}.length === 1 && function(...c){}.length === 0;
}
```

Current output (v20160201):

```js
function test() {
  return 1 === function(a, b) {
  }.length && 0 === function(a) {
  }.length;
};
```

# ES6: temporary dead zone

- default function params
- destructuring, declaration (defaults, let temporal dead zone)
- const (normal/strict mode)
- let (normal/strict mode)
- class computed names, temporarl dead zone

# ES6: spread operator

- with sparse arrays, in array literals
- spreading non-iterables is a runtime error

# ES6: object literal extensions

- computed accessors

```
JSC_CANNOT_CONVERT_YET: ES6 transpilation of 'computed getter/setter in an object literal' is not yet implemented. at line 5 character 14
              get [x] () { return 1 },
              ^
```

# ES6: string-keyed methods

- object literal extensions: string-keyed shorthand methods
- class: string-keyed methods

# ES6: iterator for astral plane strings

- for..of loops with astral plane strings
- destructuring, declaration with astral plane strings
- destructuring, assignment with astral plane strings
- destructuring, parameters: with astral plane strings

# ES6: iterator closing

- for..of loops iterator closing, break
- for..of loops iterator closing, throw
- destructuring, declaration iterator closing
- destructuring, assignment iterator closing
- destructuring, parameters iterator closing

# ES6: template strings

- toString conversion

- passed array is frozen

# ES6: RegExp "y" and "u" flags

- "y" flag
- "y" flag, lastIndex
- "u" flag
- "u" flag, lastIndex

# ES6: trailing commas in iterable patterns

- destructuring, declaration
- destructuring, assignment
- destructuring, parameters

```js
"use strict";
function test() {
  var [a,] = [1];
  return a === 1;
}
```

Current output (v20160201):
```
JSC_PARSE_ERROR: Parse error. Array pattern may not end with a comma at line 3 character 15
        var [a,] = [1];
               ^
```

# ES6: destructuring expression

- destructuring, assignment: iterable destructuring expression

Current output (v20160201): runtime exception
```
23: java.lang.IllegalStateException
	at com.google.common.base.Preconditions.checkState(Preconditions.java:164)
	at com.google.javascript.jscomp.Es6RewriteDestructuring.visitArrayPattern(Es6RewriteDestructuring.java:268)
	at com.google.javascript.jscomp.Es6RewriteDestructuring.visit(Es6RewriteDestructuring.java:68)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:625)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:619)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:619)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:619)
	at com.google.javascript.jscomp.NodeTraversal.traverseBlockScope(NodeTraversal.java:668)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:613)
	at com.google.javascript.jscomp.NodeTraversal.traverseFunction(NodeTraversal.java:659)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:611)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:619)
	at com.google.javascript.jscomp.NodeTraversal.traverseBranch(NodeTraversal.java:619)
	at com.google.javascript.jscomp.NodeTraversal.traverse(NodeTraversal.java:301)
	at com.google.javascript.jscomp.NodeTraversal.traverseEs6(NodeTraversal.java:568)
	at com.google.javascript.jscomp.Es6RewriteDestructuring.process(Es6RewriteDestructuring.java:43)
	at com.google.javascript.jscomp.PhaseOptimizer$NamedPass.process(PhaseOptimizer.java:285)
	at com.google.javascript.jscomp.PhaseOptimizer.process(PhaseOptimizer.java:217)
	at com.google.javascript.jscomp.Compiler.check(Compiler.java:782)
	at com.google.javascript.jscomp.Compiler.compileInternal(Compiler.java:698)
	at com.google.javascript.jscomp.Compiler.access$000(Compiler.java:85)
	at com.google.javascript.jscomp.Compiler$2.call(Compiler.java:656)
	at com.google.javascript.jscomp.Compiler$2.call(Compiler.java:653)
	at com.google.javascript.jscomp.CompilerExecutor.runInCompilerThread(CompilerExecutor.java:118)
	at com.google.javascript.jscomp.Compiler.runInCompilerThread(Compiler.java:679)
	at com.google.javascript.jscomp.Compiler.compile(Compiler.java:653)
	at com.google.javascript.jscomp.Compiler.compile(Compiler.java:623)
	at com.google.javascript.jscomp.webservice.backend.CompilerInvokerImpl.compile(CompilerInvokerImpl.java:46)
	at com.google.javascript.jscomp.webservice.backend.ServerController.executeRequest(ServerController.java:178)
	at com.google.javascript.jscomp.webservice.backend.CompilationRequestHandler.serviceParsedRequest(CompilationRequestHandler.java:180)
	at com.google.javascript.jscomp.webservice.backend.CompilationRequestHandler.service(CompilationRequestHandler.java:162)
	at com.google.javascript.jscomp.webservice.frontend.CompilationServlet.doPost(CompilationServlet.java:83)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:637)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)
	at org.mortbay.jetty.servlet.ServletHolder.handle(ServletHolder.java:511)
	at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1166)
	at com.google.apphosting.utils.servlet.ParseBlobUploadFilter.doFilter(ParseBlobUploadFilter.java:125)
	at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
	at com.google.apphosting.runtime.jetty.SaveSessionFilter.doFilter(SaveSessionFilter.java:37)
	at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
	at com.google.apphosting.utils.servlet.JdbcMySqlConnectionCleanupFilter.doFilter(JdbcMySqlConnectionCleanupFilter.java:60)
	at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
	at com.google.apphosting.utils.servlet.TransactionCleanupFilter.doFilter(TransactionCleanupFilter.java:43)
	at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
	at org.mortbay.jetty.servlet.ServletHandler.handle(ServletHandler.java:388)
	at org.mortbay.jetty.security.SecurityHandler.handle(SecurityHandler.java:216)
	at org.mortbay.jetty.servlet.SessionHandler.handle(SessionHandler.java:182)
	at org.mortbay.jetty.handler.ContextHandler.handle(ContextHandler.java:765)
	at org.mortbay.jetty.webapp.WebAppContext.handle(WebAppContext.java:418)
	at com.google.apphosting.runtime.jetty.AppVersionHandlerMap.handle(AppVersionHandlerMap.java:260)
	at org.mortbay.jetty.handler.HandlerWrapper.handle(HandlerWrapper.java:152)
	at org.mortbay.jetty.Server.handle(Server.java:326)
	at org.mortbay.jetty.HttpConnection.handleRequest(HttpConnection.java:542)
	at org.mortbay.jetty.HttpConnection$RequestHandler.headerComplete(HttpConnection.java:923)
	at com.google.apphosting.runtime.jetty.RpcRequestParser.parseAvailable(RpcRequestParser.java:78)
	at org.mortbay.jetty.HttpConnection.handle(HttpConnection.java:404)
	at com.google.apphosting.runtime.jetty.JettyServletEngineAdapter.serviceRequest(JettyServletEngineAdapter.java:148)
	at com.google.apphosting.runtime.JavaRuntime$RequestRunnable.run(JavaRuntime.java:468)
	at com.google.tracing.TraceContext$TraceContextRunnable.runInContext(TraceContext.java:437)
	at com.google.tracing.TraceContext$TraceContextRunnable$1.run(TraceContext.java:444)
	at com.google.tracing.CurrentContext.runInContext(CurrentContext.java:256)
	at com.google.tracing.TraceContext$AbstractTraceContextCallback.runInInheritedContextNoUnref(TraceContext.java:308)
	at com.google.tracing.TraceContext$AbstractTraceContextCallback.runInInheritedContext(TraceContext.java:300)
	at com.google.tracing.TraceContext$TraceContextRunnable.run(TraceContext.java:441)
	at com.google.apphosting.runtime.ThreadGroupPool$PoolEntry.run(ThreadGroupPool.java:235)
	at java.lang.Thread.run(Thread.java:745)
```


- destructuring, assignment: chained iterable destructuring
- destructuring, assignment: object destructuring expression
- destructuring, assignment: chained object destructuring

# ES6: trailing commas in iterable patterns

- destructuring, assignment: trailing commas in iterable patterns
- 

# ES6: throws on null and undefined

- destructuring, assignment: throws on null and undefined
- destructuring, parameters: throws on null and undefined

# ES6 destructuring, assignment: nested rest


# ES6 class: class expression

```
JSC_CANNOT_CONVERT: This code cannot be converted from ES6. Can only convert classes that are declarations or the right hand side of a simple assignment. at line 2 character 9
  return typeof class C {} === "function";
         ^
```

- class: class expression
- class: anonymous class

# ES6 class: computed static accessor properties

# ES6 class: class name is lexically scoped

# ES6 class: methods aren't enumerable

# ES6 class: implicit strict mode

# ES6 class: constructor requires new

# ES6 class: extends

- extends
- extends expressions
- extends null

# ES6 class super: in methods, property access

# ES6 class super: is statically bound

## Transpile系

### default params
- TDZ
- `arguments`との整合性
- new Function (文字列解析になるのでbabelも諦めてる)

### rest params
- function `.length`
- `arguments`との整合性
- new Function (文字列解析になるのでbabelも諦めてる)

### spread operator
- sparse array literal
- astral plane strings系

### object literal extensions
- string-keyed shorthand methods: parse error
- computed accessors: not yet implemented

### for..of loop
- astral plane strings系
- iterator closing, break: 不要
- iterator closing, throw: 不要

### ocatl and binary literals
- Number('0o1'), Number('0b1'): 不要

### Template literal
- toString: babelもやってない
- passed array is frozen

### RegExp y and u flags
- 非対応

### destructuring, declaration
- trailing commas in iterable patterns: Parse error. Array pattern may not end with a comma
- TDZ
- throws on null and undefined: transpileはOKだが、simpleにすると最適化で失敗する。

### destructuring, assignment
- trailing commas in iterable patterns: Parse error. Array pattern may not end with a comma
- object destructuring expression: 本質的にはOK, 終わったあとにunexpectedなエラーが出る
- chained object destructuring: ↑と同じ感じ
- parenthesised left-hand-side is a syntax error: ok
- throws on null and undefined: transpileはOKだが、simpleにすると最適化で失敗する。
- nested rest: Parse error

### destructuring, parameters
- trailing commas in iterable patterns: Parse error. Array pattern may not end with a comma
- throws on null and undefined: transpileはOKだが、simpleにすると最適化で失敗する。
- new Function

### Unicode code point
- identifier: 使わない

### new.target
- 使わない

### const/left
- TDZ

### arrow functions
- no line break between params and =>: ok
- no "prototype" property: 不要
- new.target: 不要

### Class
- class expression: This code cannot be converted from ES6. Can only convert classes that are declarations or the right hand side of a simple assignment.
- string-keyed methods
- computed accessor系
- static accessor properties: ng 嘘でした
- class name: Class names defined inside a function cannot be reassigned.
- methods aren't enumerable
- implicit strict mode
- constructor requires new
- extends: [14] This compiler transforms extends into code that copies properties from the superclass, instead of using the prototype chain.
    - babelは__proto__を使ってる
- extends null: The class in an extends clause must be a qualified name.
- new.target

class expressionは、代入文のみ可能。引数に与えたりするのはダメ。

```js
// OK
let a = class Foo {};
// NG
f(class Foo{});
typeof class Foo {};
```

extends expressionが無いので、[ES6 Class形式のReact mixins](https://github.com/angus-c/es6-react-mixins)では書けない。

### super
- in methods, property access: ES6 transpilation of 'Only calls to super or to a method of super are supported.' is not yet implemented. 厳しい
- is statically bound: 不要
- super() invokes the correct constructor: 不要、対応むずいbabelもやってない

### generator
- 要検証

## 全体的に対応してないもの
- TDZ
- new.target
- eval, new Functionの文字列内
- string-keyed methods
- computed accessor
- astral plane strings
- iterator closing

## 未対応だけど使いたいもの
- extends expression
- super in methods, property access

## polyfill系

### 非対応
- Iterator DOM Collections
- Reflect
- RegExp
- String.prototype[Symbol.iterator]
- well-known symbolsのいくつか
