var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
    if (b && b.Math == Math) {
      return b;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var b = $jscomp.propertyToPolyfillSymbol[c];
  if (null == b) {
    return a[c];
  }
  b = a[b];
  return void 0 !== b ? b : a[c];
};
$jscomp.polyfill = function(a, c, b, d) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, d) : $jscomp.polyfillUnisolated(a, c, b, d));
};
$jscomp.polyfillUnisolated = function(a, c, b, d) {
  b = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    e in b || (b[e] = {});
    b = b[e];
  }
  a = a[a.length - 1];
  d = b[a];
  c = c(d);
  c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, b, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    g in d || (d[g] = {});
    d = d[g];
  }
  e = e[e.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? d[e] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== b && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(d, e, {configurable:!0, writable:!0, value:c})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbol();
  var c = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var b = 0, d = function(a) {
    if (this instanceof d) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c("jscomp_symbol_" + (a || "") + "_" + b++, a);
  };
  return d;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbolIterator = function() {
  };
  var a = Symbol.iterator;
  a || (a = Symbol.iterator = Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbolAsyncIterator = function() {
  };
  Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"));
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(a) {
  return a ? a : function(a, b) {
    var c = this;
    c instanceof String && (c = String(c));
    var e = c.length;
    b = b || 0;
    for (0 > b && (b = Math.max(b + e, 0)); b < e; b++) {
      var f = c[b];
      if (f === a || Object.is(f, a)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function(a, c, b) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined");
  }
  if (c instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.includes", function(a) {
  return a ? a : function(a, b) {
    return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, b || 0);
  };
}, "es6", "es3");
module.exports = function() {
  var a = /./;
  try {
    "/./".includes(a);
  } catch (c) {
    return a[Symbol.match] = !1, "/./".includes(a);
  }
};

