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
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
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
    if (!(c in b)) {
      return;
    }
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
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  c = c[c.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? e[c] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== b && (void 0 === $jscomp.propertyToPolyfillSymbol[c] && (b = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + b + "$" + c), $jscomp.defineProperty(e, $jscomp.propertyToPolyfillSymbol[c], {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("String.fromCodePoint", function(a) {
  return a ? a : function(d) {
    for (var b = "", e = 0; e < arguments.length; e++) {
      var c = Number(arguments[e]);
      if (0 > c || 1114111 < c || c !== Math.floor(c)) {
        throw new RangeError("invalid_code_point " + c);
      }
      65535 >= c ? b += String.fromCharCode(c) : (c -= 65536, b += String.fromCharCode(c >>> 10 & 1023 | 55296), b += String.fromCharCode(c & 1023 | 56320));
    }
    return b;
  };
}, "es6", "es3");
module.exports = function() {
  return "" === String.fromCodePoint() && "*" === String.fromCodePoint(42) && "AZ" === String.fromCodePoint(65, 90) && "\ud87e\udc04" === String.fromCodePoint(194564);
};

