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
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
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
var $jscomp$lookupPolyfilledValue = function(b, d) {
  var a = $jscomp.propertyToPolyfillSymbol[d];
  if (null == a) {
    return b[d];
  }
  a = b[a];
  return void 0 !== a ? a : b[d];
};
$jscomp.polyfill = function(b, d, a, e) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, d, a, e) : $jscomp.polyfillUnisolated(b, d, a, e));
};
$jscomp.polyfillUnisolated = function(b, d, a, e) {
  a = $jscomp.global;
  b = b.split(".");
  for (e = 0; e < b.length - 1; e++) {
    var c = b[e];
    if (!(c in a)) {
      return;
    }
    a = a[c];
  }
  b = b[b.length - 1];
  e = a[b];
  d = d(e);
  d != e && null != d && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(b, d, a, e) {
  var c = b.split(".");
  b = 1 === c.length;
  e = c[0];
  e = !b && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < c.length - 1; f++) {
    var g = c[f];
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  c = c[c.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? e[c] : null;
  d = d(a);
  null != d && (b ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== a && (void 0 === $jscomp.propertyToPolyfillSymbol[c] && (a = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + a + "$" + c), c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("Math.hypot", function(b) {
  return b ? b : function(d) {
    if (2 > arguments.length) {
      return arguments.length ? Math.abs(arguments[0]) : 0;
    }
    var a, e, c;
    for (a = c = 0; a < arguments.length; a++) {
      c = Math.max(c, Math.abs(arguments[a]));
    }
    if (1e100 < c || 1e-100 > c) {
      if (!c) {
        return c;
      }
      for (a = e = 0; a < arguments.length; a++) {
        var f = Number(arguments[a]) / c;
        e += f * f;
      }
      return Math.sqrt(e) * c;
    }
    for (a = e = 0; a < arguments.length; a++) {
      f = Number(arguments[a]), e += f * f;
    }
    return Math.sqrt(e);
  };
}, "es6", "es3");
module.exports = function() {
  return 0 === Math.hypot() && 1 === Math.hypot(1) && 25 === Math.hypot(9, 12, 20) && 125 === Math.hypot(27, 36, 60, 100);
};

