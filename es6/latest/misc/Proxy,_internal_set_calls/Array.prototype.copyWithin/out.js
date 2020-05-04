var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
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
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var b = $jscomp.propertyToPolyfillSymbol[d];
  if (null == b) {
    return a[d];
  }
  b = a[b];
  return void 0 !== b ? b : a[d];
};
$jscomp.polyfill = function(a, d, b, c) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, b, c) : $jscomp.polyfillUnisolated(a, d, b, c));
};
$jscomp.polyfillUnisolated = function(a, d, b, c) {
  b = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var e = a[c];
    e in b || (b[e] = {});
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
    g in c || (c[g] = {});
    c = c[g];
  }
  e = e[e.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? c[e] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:d}) : d !== b && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(c, e, {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  function d(b) {
    b = Number(b);
    return Infinity === b || -Infinity === b ? b : b | 0;
  }
  return a ? a : function(b, c, a) {
    var e = this.length;
    b = d(b);
    c = d(c);
    a = void 0 === a ? e : d(a);
    b = 0 > b ? Math.max(e + b, 0) : Math.min(b, e);
    c = 0 > c ? Math.max(e + c, 0) : Math.min(c, e);
    a = 0 > a ? Math.max(e + a, 0) : Math.min(a, e);
    if (b < c) {
      for (; c < a;) {
        c in this ? this[b++] = this[c++] : (delete this[b++], c++);
      }
    } else {
      for (a = Math.min(a, e + c - b), b += a - c; a > c;) {
        --a in this ? this[--b] = this[a] : delete this[--b];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(d, b, c) {
    a.push(b);
    d[b] = c;
    return !0;
  }})).copyWithin(0, 3);
  return "0,1,2" === a + "";
};

