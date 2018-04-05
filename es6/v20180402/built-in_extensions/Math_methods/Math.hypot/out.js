var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, b, f) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (f = 0; f < a.length - 1; f++) {
      var c = a[f];
      c in b || (b[c] = {});
      b = b[c];
    }
    a = a[a.length - 1];
    f = b[a];
    d = d(f);
    d != f && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("Math.hypot", function(a) {
  return a ? a : function(a, b, f) {
    a = Number(a);
    b = Number(b);
    var c, e = Math.max(Math.abs(a), Math.abs(b));
    for (c = 2; c < arguments.length; c++) {
      e = Math.max(e, Math.abs(arguments[c]));
    }
    if (1e100 < e || 1e-100 > e) {
      if (!e) {
        return e;
      }
      a /= e;
      b /= e;
      var d = a * a + b * b;
      for (c = 2; c < arguments.length; c++) {
        var g = Number(arguments[c]) / e;
        d += g * g;
      }
      return Math.sqrt(d) * e;
    }
    d = a * a + b * b;
    for (c = 2; c < arguments.length; c++) {
      g = Number(arguments[c]), d += g * g;
    }
    return Math.sqrt(d);
  };
}, "es6", "es3");
module.exports = function() {
  return 0 === Math.hypot() && 1 === Math.hypot(1) && 25 === Math.hypot(9, 12, 20) && 125 === Math.hypot(27, 36, 60, 100);
};

