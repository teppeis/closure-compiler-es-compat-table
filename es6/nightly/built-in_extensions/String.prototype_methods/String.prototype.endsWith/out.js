var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, c, b) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined");
  }
  if (c instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
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
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var b = $jscomp.propertyToPolyfillSymbol[c];
  if (null == b) {
    return a[c];
  }
  b = a[b];
  return void 0 !== b ? b : a[c];
};
$jscomp.polyfill = function(a, c, b, e) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, e) : $jscomp.polyfillUnisolated(a, c, b, e));
};
$jscomp.polyfillUnisolated = function(a, c, b, e) {
  b = $jscomp.global;
  a = a.split(".");
  for (e = 0; e < a.length - 1; e++) {
    var d = a[e];
    d in b || (b[d] = {});
    b = b[d];
  }
  a = a[a.length - 1];
  e = b[a];
  c = c(e);
  c != e && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, b, e) {
  var d = a.split(".");
  a = 1 === d.length;
  e = d[0];
  e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < d.length - 1; f++) {
    var g = d[f];
    g in e || (e[g] = {});
    e = e[g];
  }
  d = d[d.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? e[d] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== b && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("String.prototype.endsWith", function(a) {
  return a ? a : function(a, b) {
    var c = $jscomp.checkStringArgs(this, a, "endsWith");
    a += "";
    void 0 === b && (b = c.length);
    b = Math.max(0, Math.min(b | 0, c.length));
    for (var d = a.length; 0 < d && 0 < b;) {
      if (c[--b] != a[--d]) {
        return !1;
      }
    }
    return 0 >= d;
  };
}, "es6", "es3");
module.exports = function() {
  return "foobar".endsWith("bar");
};

