var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, b, e) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in b || (b[d] = {});
      b = b[d];
    }
    a = a[a.length - 1];
    e = b[a];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Math.hypot", function(a) {
  return a ? a : function(a, b, e) {
    a = Number(a);
    b = Number(b);
    var d, c = Math.max(Math.abs(a), Math.abs(b));
    for (d = 2; d < arguments.length; d++) {
      c = Math.max(c, Math.abs(arguments[d]));
    }
    if (1e100 < c || 1e-100 > c) {
      a /= c;
      b /= c;
      var f = a * a + b * b;
      for (d = 2; d < arguments.length; d++) {
        var g = Number(arguments[d]) / c;
        f += g * g;
      }
      return Math.sqrt(f) * c;
    }
    f = a * a + b * b;
    for (d = 2; d < arguments.length; d++) {
      g = Number(arguments[d]), f += g * g;
    }
    return Math.sqrt(f);
  };
}, "es6", "es3");
module.exports = function() {
  return 0 === Math.hypot() && 1 === Math.hypot(1) && 25 === Math.hypot(9, 12, 20) && 125 === Math.hypot(27, 36, 60, 100);
};

