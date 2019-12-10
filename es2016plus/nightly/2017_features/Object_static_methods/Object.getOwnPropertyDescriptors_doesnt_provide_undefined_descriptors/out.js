var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, b) {
  a != Array.prototype && a != Object.prototype && (a[e] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, e, b, c) {
  if (e) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var d = a[c];
      d in b || (b[d] = {});
      b = b[d];
    }
    a = a[a.length - 1];
    c = b[a];
    e = e(c);
    e != c && null != e && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:e});
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
    for (var d = 0; d < c.length; d++) {
      ("jscomp_symbol_" == c[d].substring(0, 14) ? a : b).push(c[d]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.polyfill("Object.getOwnPropertyDescriptors", function(a) {
  return a ? a : function(a) {
    for (var b = {}, c = Reflect.ownKeys(a), d = 0; d < c.length; d++) {
      b[c[d]] = Object.getOwnPropertyDescriptor(a, c[d]);
    }
    return b;
  };
}, "es8", "es5");
module.exports = function() {
  var a = new Proxy({a:1}, {getOwnPropertyDescriptor:function(a, b) {
  }});
  return !Object.getOwnPropertyDescriptors(a).hasOwnProperty("a");
};

