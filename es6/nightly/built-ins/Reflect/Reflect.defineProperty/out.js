var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Reflect.defineProperty", function(a) {
  return a ? a : function(a, c, d) {
    try {
      Object.defineProperty(a, c, d);
      var b = Object.getOwnPropertyDescriptor(a, c);
      return b ? b.configurable === (d.configurable || !1) && b.enumerable === (d.enumerable || !1) && ("value" in b ? b.value === d.value && b.writable === (d.writable || !1) : b.get === d.get && b.set === d.set) : !1;
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

