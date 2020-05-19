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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var d = $jscomp.propertyToPolyfillSymbol[c];
  if (null == d) {
    return a[c];
  }
  d = a[d];
  return void 0 !== d ? d : a[c];
};
$jscomp.polyfill = function(a, c, d, b) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, d, b) : $jscomp.polyfillUnisolated(a, c, d, b));
};
$jscomp.polyfillUnisolated = function(a, c, d, b) {
  d = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var e = a[b];
    e in d || (d[e] = {});
    d = d[e];
  }
  a = a[a.length - 1];
  b = d[a];
  c = c(b);
  c != b && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, d, b) {
  var e = a.split(".");
  a = 1 === e.length;
  b = e[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    g in b || (b[g] = {});
    b = b[g];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? b[e] : null;
  c = c(d);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== d && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(b, e, {configurable:!0, writable:!0, value:c})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var c = function(a, c) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
  };
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = 0, b = function(a) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c("jscomp_symbol_" + (a || "") + "_" + d++, a);
  };
  return b;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < c.length; d++) {
    var b = $jscomp.global[c[d]];
    "function" === typeof b && "function" != typeof b.prototype[a] && $jscomp.defineProperty(b.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.initSymbolAsyncIterator = function() {
};
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var c = [], b = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var e = 0; e < b.length; e++) {
      ("jscomp_symbol_" == b[e].substring(0, 14) ? a : c).push(b[e]);
    }
    return c.concat(a);
  };
}, "es6", "es5");
module.exports = function() {
  var a = Symbol(), c = Symbol(), d = Symbol(), b = {1:!0, A:!0, B:!0, };
  b[a] = !0;
  b[2] = !0;
  b[c] = !0;
  Object.defineProperty(b, "C", {value:!0, enumerable:!0});
  Object.defineProperty(b, d, {value:!0, enumerable:!0});
  Object.defineProperty(b, "D", {value:!0, enumerable:!0});
  b = Reflect.ownKeys(b);
  var e = b.length;
  return b[e - 3] === a && b[e - 2] === c && b[e - 1] === d;
};

