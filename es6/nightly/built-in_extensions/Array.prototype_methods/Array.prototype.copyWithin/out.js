var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, e, a) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[e] = a.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < b.length; ++e) {
    var a = b[e];
    if (a && a.Math == Math) {
      return a;
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
var $jscomp$lookupPolyfilledValue = function(b, e) {
  var a = $jscomp.propertyToPolyfillSymbol[e];
  if (null == a) {
    return b[e];
  }
  a = b[a];
  return void 0 !== a ? a : b[e];
};
$jscomp.polyfill = function(b, e, a, c) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, e, a, c) : $jscomp.polyfillUnisolated(b, e, a, c));
};
$jscomp.polyfillUnisolated = function(b, e, a, c) {
  a = $jscomp.global;
  b = b.split(".");
  for (c = 0; c < b.length - 1; c++) {
    var d = b[c];
    if (!(d in a)) {
      return;
    }
    a = a[d];
  }
  b = b[b.length - 1];
  c = a[b];
  e = e(c);
  e != c && null != e && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(b, e, a, c) {
  var d = b.split(".");
  b = 1 === d.length;
  c = d[0];
  c = !b && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < d.length - 1; f++) {
    var g = d[f];
    if (!(g in c)) {
      return;
    }
    c = c[g];
  }
  d = d[d.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? c[d] : null;
  e = e(a);
  null != e && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:e}) : e !== a && (void 0 === $jscomp.propertyToPolyfillSymbol[d] && (a = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + a + "$" + d), d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(c, d, {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("Array.prototype.copyWithin", function(b) {
  function e(a) {
    a = Number(a);
    return Infinity === a || -Infinity === a ? a : a | 0;
  }
  return b ? b : function(a, c, d) {
    var f = this.length;
    a = e(a);
    c = e(c);
    d = void 0 === d ? f : e(d);
    a = 0 > a ? Math.max(f + a, 0) : Math.min(a, f);
    c = 0 > c ? Math.max(f + c, 0) : Math.min(c, f);
    d = 0 > d ? Math.max(f + d, 0) : Math.min(d, f);
    if (a < c) {
      for (; c < d;) {
        c in this ? this[a++] = this[c++] : (delete this[a++], c++);
      }
    } else {
      for (d = Math.min(d, f + c - a), a += d - c; d > c;) {
        --d in this ? this[--a] = this[d] : delete this[--a];
      }
    }
    return this;
  };
}, "es6", "es3");
$jscomp.typedArrayCopyWithin = function(b) {
  return b ? b : Array.prototype.copyWithin;
};
$jscomp.polyfill("Int8Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Uint8Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Uint8ClampedArray.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Int16Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Uint16Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Int32Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Uint32Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Float32Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
$jscomp.polyfill("Float64Array.prototype.copyWithin", $jscomp.typedArrayCopyWithin, "es6", "es5");
module.exports = function() {
  var b = require("assert");
  b.deepEqual([1, 2, 3, 4, 5].copyWithin(), [1, 2, 3, 4, 5]);
  b.deepEqual([1, 2, 3, 4, 5].copyWithin(2), [1, 2, 1, 2, 3]);
  b.deepEqual([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 1, 2]);
  b.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
  b.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
  return !0;
};

