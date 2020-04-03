var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, d, c) {
  if (b) {
    d = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in d || (d[e] = {});
      d = d[e];
    }
    a = a[a.length - 1];
    c = d[a];
    b = b(c);
    b != c && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var b = [], c = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var e = 0; e < c.length; e++) {
      ("jscomp_symbol_" == c[e].substring(0, 14) ? a : b).push(c[e]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.polyfill("Object.getOwnPropertyDescriptors", function(a) {
  return a ? a : function(a) {
    for (var b = {}, c = Reflect.ownKeys(a), e = 0; e < c.length; e++) {
      b[c[e]] = Object.getOwnPropertyDescriptor(a, c[e]);
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

