var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++],} : {done:!0};
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
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
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
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var d = $jscomp.propertyToPolyfillSymbol[b];
  if (null == d) {
    return a[b];
  }
  d = a[d];
  return void 0 !== d ? d : a[b];
};
$jscomp.polyfill = function(a, b, d, c) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, c) : $jscomp.polyfillUnisolated(a, b, d, c));
};
$jscomp.polyfillUnisolated = function(a, b, d, c) {
  d = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var e = a[c];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  a = a[a.length - 1];
  c = d[a];
  b = b(c);
  b != c && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, c) {
  var e = a.split(".");
  a = 1 === e.length;
  c = e[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in c)) {
      return;
    }
    c = c[g];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? c[e] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (d = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + d + "$" + e), $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:b})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(f, g) {
    this.$jscomp$symbol$id_ = f;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:g});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", c = 0, e = function(f) {
    if (this instanceof e) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b(d + (f || "") + "_" + c++, f);
  };
  return e;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
    var c = $jscomp.global[b[d]];
    "function" === typeof c && "function" != typeof c.prototype[a] && $jscomp.defineProperty(c.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.polyfill("Reflect", function(a) {
  return a ? a : {};
}, "es6", "es3");
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(b) {
    var d = [], c = Object.getOwnPropertyNames(b);
    b = Object.getOwnPropertySymbols(b);
    for (var e = 0; e < c.length; e++) {
      ("jscomp_symbol_" == c[e].substring(0, 14) ? b : d).push(c[e]);
    }
    return d.concat(b);
  };
}, "es6", "es5");
module.exports = function() {
  var a = Symbol(), b = Symbol(), d = Symbol(), c = {1:!0, A:!0, B:!0};
  c[a] = !0;
  c[2] = !0;
  c[b] = !0;
  Object.defineProperty(c, "C", {value:!0, enumerable:!0});
  Object.defineProperty(c, d, {value:!0, enumerable:!0});
  Object.defineProperty(c, "D", {value:!0, enumerable:!0});
  c = Reflect.ownKeys(c);
  var e = c.length;
  return c[e - 3] === a && c[e - 2] === b && c[e - 1] === d;
};

