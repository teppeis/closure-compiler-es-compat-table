var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, a) {
  b != Array.prototype && b != Object.prototype && (b[c] = a.value);
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < b.length; ++c) {
    var a = b[c];
    if (a && a.Math == Math) {
      return a;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = $jscomp.ISOLATE_POLYFILLS && "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var a = $jscomp.propertyToPolyfillSymbol[c];
  if (null == a) {
    return b[c];
  }
  a = b[a];
  return void 0 !== a ? a : b[c];
};
$jscomp.polyfill = function(b, c, a, d) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, a, d) : $jscomp.polyfillUnisolated(b, c, a, d));
};
$jscomp.polyfillUnisolated = function(b, c, a, d) {
  a = $jscomp.global;
  b = b.split(".");
  for (d = 0; d < b.length - 1; d++) {
    var e = b[d];
    e in a || (a[e] = {});
    a = a[e];
  }
  b = b[b.length - 1];
  d = a[b];
  c = c(d);
  c != d && null != c && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, a, d) {
  var e = b.split(".");
  b = 1 === e.length;
  d = e[0];
  d = !b && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    g in d || (d[g] = {});
    d = d[g];
  }
  e = e[e.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? d[e] : null;
  c = c(a);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== a && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(d, e, {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Array.prototype.fill", function(b) {
  return b ? b : function(b, a, d) {
    var c = this.length || 0;
    0 > a && (a = Math.max(0, c + a));
    if (null == d || d > c) {
      d = c;
    }
    d = Number(d);
    0 > d && (d = Math.max(0, c + d));
    for (a = Number(a || 0); a < d; a++) {
      this[a] = b;
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var b = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(c, a, d) {
    b.push(a);
    c[a] = d;
    return !0;
  }})).fill(0, 3);
  return "3,4,5" === b + "";
};

