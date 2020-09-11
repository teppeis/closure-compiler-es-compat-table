var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(b, a, c) {
  if (null == b) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (a instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return b + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.ENABLE_UNHANDLED_REJECTION_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, c) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[a] = c.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var a = 0; a < b.length; ++a) {
    var c = b[a];
    if (c && c.Math == Math) {
      return c;
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
var $jscomp$lookupPolyfilledValue = function(b, a) {
  var c = $jscomp.propertyToPolyfillSymbol[a];
  if (null == c) {
    return b[a];
  }
  c = b[c];
  return void 0 !== c ? c : b[a];
};
$jscomp.polyfill = function(b, a, c, e) {
  a && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, a, c, e) : $jscomp.polyfillUnisolated(b, a, c, e));
};
$jscomp.polyfillUnisolated = function(b, a, c, e) {
  c = $jscomp.global;
  b = b.split(".");
  for (e = 0; e < b.length - 1; e++) {
    var d = b[e];
    if (!(d in c)) {
      return;
    }
    c = c[d];
  }
  b = b[b.length - 1];
  e = c[b];
  a = a(e);
  a != e && null != a && $jscomp.defineProperty(c, b, {configurable:!0, writable:!0, value:a});
};
$jscomp.polyfillIsolated = function(b, a, c, e) {
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
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? e[d] : null;
  a = a(c);
  null != a && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:a}) : a !== c && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {configurable:!0, writable:!0, value:a})));
};
$jscomp.polyfill("String.prototype.codePointAt", function(b) {
  return b ? b : function(a) {
    var c = $jscomp.checkStringArgs(this, null, "codePointAt"), e = c.length;
    a = Number(a) || 0;
    if (0 <= a && a < e) {
      a |= 0;
      var d = c.charCodeAt(a);
      if (55296 > d || 56319 < d || a + 1 === e) {
        return d;
      }
      a = c.charCodeAt(a + 1);
      return 56320 > a || 57343 < a ? d : 1024 * (d - 55296) + a + 9216;
    }
  };
}, "es6", "es3");
module.exports = function() {
  return 97 === "abc".codePointAt() && 97 === "abc".codePointAt(0) && 98 === "abc".codePointAt(1) && 98 === "abc".codePointAt(1) && 194564 === "\ud87e\udc04".codePointAt(0);
};

