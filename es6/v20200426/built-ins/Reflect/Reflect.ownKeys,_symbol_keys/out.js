var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(c) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + b++, c);
  }
  var b = 0;
  return a;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) {
    return a[b];
  }
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function(a, b, c, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function(a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    e in c || (c[e] = {});
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, c, d) {
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
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== c && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(d, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var b = [], d = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var e = 0; e < d.length; e++) {
      ("jscomp_symbol_" == d[e].substring(0, 14) ? a : b).push(d[e]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
module.exports = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  var a = Symbol(), b = Symbol(), c = Symbol(), d = {};
  d[a] = !0;
  a = Object.create(d);
  a[b] = !0;
  Object.defineProperty(a, c, {value:!0, enumerable:!1});
  a = Reflect.ownKeys(a);
  return -1 < a.indexOf(b) && -1 < a.indexOf(c) && 2 === a.length;
};

