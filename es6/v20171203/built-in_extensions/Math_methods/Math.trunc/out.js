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
$jscomp.polyfill("Math.trunc", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) {
      return a;
    }
    var b = Math.floor(Math.abs(a));
    return 0 > a ? -b : b;
  };
}, "es6", "es3");
module.exports = function() {
  var a = Math.trunc(NaN);
  return 0 === Math.trunc(0) && -0 === Math.trunc(-0) && 1 === Math.trunc(1.1) && -1 === Math.trunc(-1.1) && 0 === Math.trunc(0.1) && -0 === Math.trunc(-0.1) && Infinity === Math.trunc(Infinity) && -Infinity === Math.trunc(-Infinity) && a !== a;
};

