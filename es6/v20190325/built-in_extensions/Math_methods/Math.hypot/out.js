var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, a) {
  b != Array.prototype && b != Object.prototype && (b[c] = a.value);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, c, a, d) {
  if (c) {
    a = $jscomp.global;
    b = b.split(".");
    for (d = 0; d < b.length - 1; d++) {
      var e = b[d];
      e in a || (a[e] = {});
      a = a[e];
    }
    b = b[b.length - 1];
    d = a[b];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Math.hypot", function(b) {
  return b ? b : function(b) {
    if (2 > arguments.length) {
      return arguments.length ? Math.abs(arguments[0]) : 0;
    }
    var a, d, e;
    for (a = e = 0; a < arguments.length; a++) {
      e = Math.max(e, Math.abs(arguments[a]));
    }
    if (1e100 < e || 1e-100 > e) {
      if (!e) {
        return e;
      }
      for (a = d = 0; a < arguments.length; a++) {
        var c = Number(arguments[a]) / e;
        d += c * c;
      }
      return Math.sqrt(d) * e;
    }
    for (a = d = 0; a < arguments.length; a++) {
      c = Number(arguments[a]), d += c * c;
    }
    return Math.sqrt(d);
  };
}, "es6", "es3");
module.exports = function() {
  return 0 === Math.hypot() && 1 === Math.hypot(1) && 25 === Math.hypot(9, 12, 20) && 125 === Math.hypot(27, 36, 60, 100);
};

