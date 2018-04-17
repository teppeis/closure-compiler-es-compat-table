var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
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
$jscomp.polyfill("Math.clz32", function(a) {
  return a ? a : function(b) {
    b = Number(b) >>> 0;
    if (0 === b) {
      return 32;
    }
    var a = 0;
    0 === (b & 4294901760) && (b <<= 16, a += 16);
    0 === (b & 4278190080) && (b <<= 8, a += 8);
    0 === (b & 4026531840) && (b <<= 4, a += 4);
    0 === (b & 3221225472) && (b <<= 2, a += 2);
    0 === (b & 2147483648) && a++;
    return a;
  };
}, "es6", "es3");
module.exports = function() {
  return 32 === Math.clz32(0) && 31 === Math.clz32(1);
};

