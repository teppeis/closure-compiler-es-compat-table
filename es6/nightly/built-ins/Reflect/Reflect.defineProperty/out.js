var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, c) {
  a != Array.prototype && a != Object.prototype && (a[e] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
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
$jscomp.polyfill("Reflect.defineProperty", function(a) {
  return a ? a : function(a, c, b) {
    try {
      Object.defineProperty(a, c, b);
      var d = Object.getOwnPropertyDescriptor(a, c);
      return d ? d.configurable === (b.configurable || !1) && d.enumerable === (b.enumerable || !1) && ("value" in d ? d.value === b.value && d.writable === (b.writable || !1) : d.get === b.get && d.set === b.set) : !1;
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

