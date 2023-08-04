var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var d = 0; d < a.length; ++d) {
    var b = a[d];
    if (b && b.Math == Math) {
      return b;
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
var $jscomp$lookupPolyfilledValue = function(a, d, b) {
  if (!b || null != a) {
    b = $jscomp.propertyToPolyfillSymbol[d];
    if (null == b) {
      return a[d];
    }
    b = a[b];
    return void 0 !== b ? b : a[d];
  }
};
$jscomp.polyfill = function(a, d, b, c) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, b, c) : $jscomp.polyfillUnisolated(a, d, b, c));
};
$jscomp.polyfillUnisolated = function(a, d, b, c) {
  b = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var e = a[c];
    if (!(e in b)) {
      return;
    }
    b = b[e];
  }
  a = a[a.length - 1];
  c = b[a];
  d = d(c);
  d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, b, c) {
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
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? c[e] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:d}) : d !== b && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (b = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + b + "$" + e), $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(d, b, c) {
    var e = this.length || 0;
    0 > b && (b = Math.max(0, e + b));
    if (null == c || c > e) {
      c = e;
    }
    c = Number(c);
    0 > c && (c = Math.max(0, e + c));
    for (b = Number(b || 0); b < c; b++) {
      this[b] = d;
    }
    return this;
  };
}, "es6", "es3");
$jscomp.typedArrayFill = function(a) {
  return a ? a : Array.prototype.fill;
};
$jscomp.polyfill("Int8Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint8Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint8ClampedArray.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Int16Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint16Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Int32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Uint32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Float32Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
$jscomp.polyfill("Float64Array.prototype.fill", $jscomp.typedArrayFill, "es6", "es5");
module.exports = function() {
  var a = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(d, b, c) {
    a.push(b);
    d[b] = c;
    return !0;
  }})).fill(0, 3);
  return "3,4,5" === a + "";
};

