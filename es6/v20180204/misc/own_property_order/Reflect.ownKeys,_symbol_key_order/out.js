var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, c) {
  a != Array.prototype && a != Object.prototype && (a[e] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, e, c, b) {
  if (e) {
    c = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var d = a[b];
      d in c || (c[d] = {});
      c = c[d];
    }
    a = a[a.length - 1];
    b = c[a];
    e = e(b);
    e != b && null != e && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var c = [], b = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var d = 0; d < b.length; d++) {
      ("jscomp_symbol_" == b[d].substring(0, 14) ? a : c).push(b[d]);
    }
    return c.concat(a);
  };
}, "es6", "es5");
module.exports = function() {
  var a = Symbol(), e = Symbol(), c = Symbol(), b = {1:!0, A:!0, B:!0};
  b[a] = !0;
  b[2] = !0;
  b[e] = !0;
  Object.defineProperty(b, "C", {value:!0, enumerable:!0});
  Object.defineProperty(b, c, {value:!0, enumerable:!0});
  Object.defineProperty(b, "D", {value:!0, enumerable:!0});
  b = Reflect.ownKeys(b);
  var d = b.length;
  return b[d - 3] === a && b[d - 2] === e && b[d - 1] === c;
};

