var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
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
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var b = $jscomp.propertyToPolyfillSymbol[d];
  if (null == b) {
    return a[d];
  }
  b = a[b];
  return void 0 !== b ? b : a[d];
};
$jscomp.polyfill = function(a, d, b, e) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, b, e) : $jscomp.polyfillUnisolated(a, d, b, e));
};
$jscomp.polyfillUnisolated = function(a, d, b, e) {
  b = $jscomp.global;
  a = a.split(".");
  for (e = 0; e < a.length - 1; e++) {
    var c = a[e];
    c in b || (b[c] = {});
    b = b[c];
  }
  a = a[a.length - 1];
  e = b[a];
  d = d(e);
  d != e && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, b, e) {
  var c = a.split(".");
  a = 1 === c.length;
  e = c[0];
  e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < c.length - 1; f++) {
    var g = c[f];
    g in e || (e[g] = {});
    e = e[g];
  }
  c = c[c.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? e[c] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== b && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  function d(b) {
    b = Number(b);
    return Infinity === b || -Infinity === b ? b : b | 0;
  }
  return a ? a : function(b, a, c) {
    var e = this.length;
    b = d(b);
    a = d(a);
    c = void 0 === c ? e : d(c);
    b = 0 > b ? Math.max(e + b, 0) : Math.min(b, e);
    a = 0 > a ? Math.max(e + a, 0) : Math.min(a, e);
    c = 0 > c ? Math.max(e + c, 0) : Math.min(c, e);
    if (b < a) {
      for (; a < c;) {
        a in this ? this[b++] = this[a++] : (delete this[b++], a++);
      }
    } else {
      for (c = Math.min(c, e + a - b), b += c - a; c > a;) {
        --c in this ? this[--b] = this[c] : delete this[--b];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = require("assert");
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(), [1, 2, 3, 4, 5]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(2), [1, 2, 1, 2, 3]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 1, 2]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
  return !0;
};

