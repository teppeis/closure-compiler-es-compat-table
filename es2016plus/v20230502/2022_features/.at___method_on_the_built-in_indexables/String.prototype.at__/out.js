var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
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
var $jscomp$lookupPolyfilledValue = function(a, b, c) {
  if (!c || null != a) {
    c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) {
      return a[b];
    }
    c = a[c];
    return void 0 !== c ? c : a[b];
  }
};
$jscomp.polyfill = function(a, b, c, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function(a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in c)) {
      return;
    }
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
    if (!(g in d)) {
      return;
    }
    d = d[g];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (c = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + c + "$" + e), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("Math.trunc", function(a) {
  return a ? a : function(b) {
    b = Number(b);
    if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b) {
      return b;
    }
    var c = Math.floor(Math.abs(b));
    return 0 > b ? -c : c;
  };
}, "es6", "es3");
$jscomp.atMethod = function(a) {
  a = Math.trunc(a) || 0;
  0 > a && (a += this.length);
  if (!(0 > a || a >= this.length)) {
    return this[a];
  }
};
$jscomp.polyfill("Array.prototype.at", function(a) {
  return a ? a : $jscomp.atMethod;
}, "es_next", "es5");
$jscomp.typedArrayAt = function(a) {
  return a ? a : $jscomp.atMethod;
};
$jscomp.polyfill("Int8Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Uint8Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Uint8ClampedArray.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Int16Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Uint16Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Int32Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Uint32Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Float32Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("Float64Array.prototype.at", $jscomp.typedArrayAt, "es_next", "es5");
$jscomp.polyfill("String.prototype.at", function(a) {
  return a ? a : $jscomp.atMethod;
}, "es_next", "es5");
module.exports = function() {
  return "a" === "abc".at(0) && "a" === "abc".at(-3) && "b" === "abc".at(1) && "b" === "abc".at(-2) && "c" === "abc".at(2) && "c" === "abc".at(-1) && void 0 === "abc".at(3) && void 0 === "abc".at(-4);
};

