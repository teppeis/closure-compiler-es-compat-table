var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = e.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var e = a[b];
    if (e && e.Math == Math) {
      return e;
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
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var e = $jscomp.propertyToPolyfillSymbol[b];
  if (null == e) {
    return a[b];
  }
  e = a[e];
  return void 0 !== e ? e : a[b];
};
$jscomp.polyfill = function(a, b, e, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, e, d) : $jscomp.polyfillUnisolated(a, b, e, d));
};
$jscomp.polyfillUnisolated = function(a, b, e, d) {
  e = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var c = a[d];
    c in e || (e[c] = {});
    e = e[c];
  }
  a = a[a.length - 1];
  d = e[a];
  b = b(d);
  b != d && null != b && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, e, d) {
  var c = a.split(".");
  a = 1 === c.length;
  d = c[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < c.length - 1; f++) {
    var g = c[f];
    g in d || (d[g] = {});
    d = d[g];
  }
  c = c[c.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? d[c] : null;
  b = b(e);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:b}) : b !== e && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(d, c, {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var b = [], d = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var c = 0; c < d.length; c++) {
      ("jscomp_symbol_" == d[c].substring(0, 14) ? a : b).push(d[c]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.polyfill("Object.getOwnPropertyDescriptors", function(a) {
  return a ? a : function(a) {
    for (var b = {}, d = Reflect.ownKeys(a), c = 0; c < d.length; c++) {
      b[d[c]] = Object.getOwnPropertyDescriptor(a, d[c]);
    }
    return b;
  };
}, "es8", "es5");
module.exports = function() {
  var a = {a:1}, b = "function" === typeof Symbol ? Symbol("b") : "b";
  a[b] = 2;
  a = Object.defineProperty(a, "c", {value:3});
  a = Object.getOwnPropertyDescriptors(a);
  return 1 === a.a.value && !0 === a.a.enumerable && !0 === a.a.configurable && !0 === a.a.writable && 2 === a[b].value && !0 === a[b].enumerable && !0 === a[b].configurable && !0 === a[b].writable && 3 === a.c.value && !1 === a.c.enumerable && !1 === a.c.configurable && !1 === a.c.writable;
};

