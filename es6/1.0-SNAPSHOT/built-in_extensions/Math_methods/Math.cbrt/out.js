var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, b, d) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Math.cbrt", function(a) {
  return a ? a : function(a) {
    if (0 === a) {
      return a;
    }
    a = Number(a);
    var b = Math.pow(Math.abs(a), 1 / 3);
    return 0 > a ? -b : b;
  };
}, "es6", "es3");
module.exports = function() {
  return -1 === Math.cbrt(-1) && 4 === Math.cbrt(64) && 0 === Math.cbrt(0) && -0 === Math.cbrt(-0) && Infinity === Math.cbrt(Infinity) && -Infinity === Math.cbrt(-Infinity);
};

