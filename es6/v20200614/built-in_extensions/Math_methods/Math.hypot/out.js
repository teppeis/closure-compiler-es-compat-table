var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, a) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = a.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < b.length; ++c) {
    var a = b[c];
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
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var a = $jscomp.propertyToPolyfillSymbol[c];
  if (null == a) {
    return b[c];
  }
  a = b[a];
  return void 0 !== a ? a : b[c];
};
$jscomp.polyfill = function(b, c, a, e) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, a, e) : $jscomp.polyfillUnisolated(b, c, a, e));
};
$jscomp.polyfillUnisolated = function(b, c, a, e) {
  a = $jscomp.global;
  b = b.split(".");
  for (e = 0; e < b.length - 1; e++) {
    var d = b[e];
    if (!(d in a)) {
      return;
    }
    a = a[d];
  }
  b = b[b.length - 1];
  e = a[b];
  c = c(e);
  c != e && null != c && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, a, e) {
  var d = b.split(".");
  b = 1 === d.length;
  e = d[0];
  e = !b && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < d.length - 1; f++) {
    var g = d[f];
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  d = d[d.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? e[d] : null;
  c = c(a);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== a && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Math.hypot", function(b) {
  return b ? b : function(b) {
    if (2 > arguments.length) {
      return arguments.length ? Math.abs(arguments[0]) : 0;
    }
    var a, c, d;
    for (a = d = 0; a < arguments.length; a++) {
      d = Math.max(d, Math.abs(arguments[a]));
    }
    if (1e100 < d || 1e-100 > d) {
      if (!d) {
        return d;
      }
      for (a = c = 0; a < arguments.length; a++) {
        var f = Number(arguments[a]) / d;
        c += f * f;
      }
      return Math.sqrt(c) * d;
    }
    for (a = c = 0; a < arguments.length; a++) {
      f = Number(arguments[a]), c += f * f;
    }
    return Math.sqrt(c);
  };
}, "es6", "es3");
module.exports = function() {
  return 0 === Math.hypot() && 1 === Math.hypot(1) && 25 === Math.hypot(9, 12, 20) && 125 === Math.hypot(27, 36, 60, 100);
};

