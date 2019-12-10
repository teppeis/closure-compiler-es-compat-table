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
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, e) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in c || (c[d] = {});
      c = c[d];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Math.log1p", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    if (0.25 > a && -0.25 < a) {
      for (var c = a, b = 1, d = a, f = 0, g = 1; f != d;) {
        c *= a, g *= -1, d = (f = d) + g * c / ++b;
      }
      return d;
    }
    return Math.log(1 + a);
  };
}, "es6", "es3");
$jscomp.polyfill("Math.atanh", function(a) {
  if (a) {
    return a;
  }
  var b = Math.log1p;
  return function(a) {
    a = Number(a);
    return (b(a) - b(-a)) / 2;
  };
}, "es6", "es3");
module.exports = function() {
  var a = Math.atanh(NaN), b = Math.atanh(2), c = Math.atanh(-2);
  return 0 === Math.atanh(0) && -0 === Math.atanh(-0) && Infinity === Math.atanh(1) && -Infinity === Math.atanh(-1) && a !== a && b !== b && c !== c;
};

