var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[e] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < a.length; ++e) {
    var b = a[e];
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
var $jscomp$lookupPolyfilledValue = function(a, e) {
  var b = $jscomp.propertyToPolyfillSymbol[e];
  if (null == b) {
    return a[e];
  }
  b = a[b];
  return void 0 !== b ? b : a[e];
};
$jscomp.polyfill = function(a, e, b, c) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, e, b, c) : $jscomp.polyfillUnisolated(a, e, b, c));
};
$jscomp.polyfillUnisolated = function(a, e, b, c) {
  b = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var d = a[c];
    if (!(d in b)) {
      return;
    }
    b = b[d];
  }
  a = a[a.length - 1];
  c = b[a];
  e = e(c);
  e != c && null != e && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(a, e, b, c) {
  var d = a.split(".");
  a = 1 === d.length;
  c = d[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < d.length - 1; f++) {
    var g = d[f];
    if (!(g in c)) {
      return;
    }
    c = c[g];
  }
  d = d[d.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? c[d] : null;
  e = e(b);
  null != e && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:e}) : e !== b && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(c, d, {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("Reflect", function(a) {
  return a ? a : {};
}, "es6", "es3");
$jscomp.polyfill("Reflect.defineProperty", function(a) {
  return a ? a : function(a, b, c) {
    try {
      Object.defineProperty(a, b, c);
      var d = Object.getOwnPropertyDescriptor(a, b);
      return d ? d.configurable === (c.configurable || !1) && d.enumerable === (c.enumerable || !1) && ("value" in d ? d.value === c.value && d.writable === (c.writable || !1) : d.get === c.get && d.set === c.set) : !1;
    } catch (f) {
      return !1;
    }
  };
}, "es6", "es5");
module.exports = function() {
  var a = {};
  Reflect.defineProperty(a, "foo", {value:123});
  return 123 === a.foo && !1 === Reflect.defineProperty(Object.freeze({}), "foo", {value:123});
};

