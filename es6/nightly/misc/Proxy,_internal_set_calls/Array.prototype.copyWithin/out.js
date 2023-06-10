var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, a) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[d] = a.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var d = 0; d < b.length; ++d) {
    var a = b[d];
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
var $jscomp$lookupPolyfilledValue = function(b, d, a) {
  if (!a || null != b) {
    a = $jscomp.propertyToPolyfillSymbol[d];
    if (null == a) {
      return b[d];
    }
    a = b[a];
    return void 0 !== a ? a : b[d];
  }
};
$jscomp.polyfill = function(b, d, a, c) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, d, a, c) : $jscomp.polyfillUnisolated(b, d, a, c));
};
$jscomp.polyfillUnisolated = function(b, d, a, c) {
  a = $jscomp.global;
  b = b.split(".");
  for (c = 0; c < b.length - 1; c++) {
    var e = b[c];
    if (!(e in a)) {
      return;
    }
    a = a[e];
  }
  b = b[b.length - 1];
  c = a[b];
  d = d(c);
  d != c && null != d && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(b, d, a, c) {
  var e = b.split(".");
  b = 1 === e.length;
  c = e[0];
  c = !b && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in c)) {
      return;
    }
    c = c[g];
  }
  e = e[e.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? c[e] : null;
  d = d(a);
  null != d && (b ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:d}) : d !== a && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (a = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + a + "$" + e), $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("Array.prototype.copyWithin", function(b) {
  function d(a) {
    a = Number(a);
    return Infinity === a || -Infinity === a ? a : a | 0;
  }
  return b ? b : function(a, c, e) {
    var f = this.length;
    a = d(a);
    c = d(c);
    e = void 0 === e ? f : d(e);
    a = 0 > a ? Math.max(f + a, 0) : Math.min(a, f);
    c = 0 > c ? Math.max(f + c, 0) : Math.min(c, f);
    e = 0 > e ? Math.max(f + e, 0) : Math.min(e, f);
    if (a < c) {
      for (; c < e;) {
        c in this ? this[a++] = this[c++] : (delete this[a++], c++);
      }
    } else {
      for (e = Math.min(e, f + c - a), a += e - c; e > c;) {
        --e in this ? this[--a] = this[e] : delete this[--a];
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
  var b = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(d, a, c) {
    b.push(a);
    d[a] = c;
    return !0;
  }})).copyWithin(0, 3);
  return "0,1,2" === b + "";
};

