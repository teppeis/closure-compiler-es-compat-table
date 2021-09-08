var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, a) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = a.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
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
$jscomp.polyfill = function(b, c, a, d) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, a, d) : $jscomp.polyfillUnisolated(b, c, a, d));
};
$jscomp.polyfillUnisolated = function(b, c, a, d) {
  a = $jscomp.global;
  b = b.split(".");
  for (d = 0; d < b.length - 1; d++) {
    var e = b[d];
    if (!(e in a)) {
      return;
    }
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
    if (!(g in d)) {
      return;
    }
    d = d[g];
  }
  e = e[e.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? d[e] : null;
  c = c(a);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== a && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (a = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + a + "$" + e), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Object.is", function(b) {
  return b ? b : function(c, a) {
    return c === a ? 0 !== c || 1 / c === 1 / a : c !== c && a !== a;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(b) {
  return b ? b : function(c, a) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    a = a || 0;
    for (0 > a && (a = Math.max(a + e, 0)); a < e; a++) {
      var f = d[a];
      if (f === c || Object.is(f, c)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function(b, c, a) {
  if (null == b) {
    throw new TypeError("The 'this' value for String.prototype." + a + " must not be null or undefined");
  }
  if (c instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + a + " must not be a regular expression");
  }
  return b + "";
};
$jscomp.polyfill("String.prototype.includes", function(b) {
  return b ? b : function(c, a) {
    return -1 !== $jscomp.checkStringArgs(this, c, "includes").indexOf(c, a || 0);
  };
}, "es6", "es3");
module.exports = function() {
  return [1, 2, 3].includes(1) && ![1, 2, 3].includes(4) && ![1, 2, 3].includes(1, 1) && [NaN].includes(NaN) && Array(1).includes();
};

