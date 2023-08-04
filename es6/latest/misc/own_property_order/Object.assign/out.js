var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
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
var $jscomp$lookupPolyfilledValue = function(a, c, b) {
  if (!b || null != a) {
    b = $jscomp.propertyToPolyfillSymbol[c];
    if (null == b) {
      return a[c];
    }
    b = a[b];
    return void 0 !== b ? b : a[c];
  }
};
$jscomp.polyfill = function(a, c, b, d) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, d) : $jscomp.polyfillUnisolated(a, c, b, d));
};
$jscomp.polyfillUnisolated = function(a, c, b, d) {
  b = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in b)) {
      return;
    }
    b = b[e];
  }
  a = a[a.length - 1];
  d = b[a];
  c = c(d);
  c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, b, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in d)) {
      return;
    }
    d = d[g];
  }
  e = e[e.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? d[e] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== b && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (b = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + b + "$" + e), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:c})));
};
$jscomp.assign = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign ? Object.assign : function(a, c) {
  for (var b = 1; b < arguments.length; b++) {
    var d = arguments[b];
    if (d) {
      for (var e in d) {
        $jscomp.owns(d, e) && (a[e] = d[e]);
      }
    }
  }
  return a;
};
$jscomp.polyfill("Object.assign", function(a) {
  return a || $jscomp.assign;
}, "es6", "es3");
module.exports = function() {
  var a = "", c = {};
  "012349 DBACEFGHIJKLMNOPQRST".split("").concat(-1).forEach(function(d) {
    Object.defineProperty(c, d, {set:function() {
      a += d;
    }});
  });
  var b = {2:2, 0:0, 1:1, " ":" ", 9:9, D:"D", B:"B", "-1":"-1"};
  Object.defineProperty(b, "A", {value:"A", enumerable:!0});
  Object.defineProperty(b, "3", {value:"3", enumerable:!0});
  Object.defineProperty(b, "C", {value:"C", enumerable:!0});
  Object.defineProperty(b, "4", {value:"4", enumerable:!0});
  delete b[2];
  b[2] = !0;
  "EFGHIJKLMNOPQRST".split("").forEach(function(d) {
    b[d] = d;
  });
  Object.assign(c, b);
  return "012349 DB-1ACEFGHIJKLMNOPQRST" === a;
};

