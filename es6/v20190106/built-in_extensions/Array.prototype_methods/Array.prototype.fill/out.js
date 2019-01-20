var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, b, c) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    c = b[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(a, b, c) {
    var d = this.length || 0;
    0 > b && (b = Math.max(0, d + b));
    if (null == c || c > d) {
      c = d;
    }
    c = Number(c);
    0 > c && (c = Math.max(0, d + c));
    for (b = Number(b || 0); b < c; b++) {
      this[b] = a;
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = require("assert");
  a.deepEqual([1, 2, 3].fill(), [void 0, void 0, void 0]);
  a.deepEqual([1, 2, 3].fill(4), [4, 4, 4]);
  a.deepEqual([1, 2, 3].fill(4, 1), [1, 4, 4]);
  a.deepEqual([1, 2, 3].fill(4, 1, 2), [1, 4, 3]);
  a.deepEqual([1, 2, 3].fill(4, -3, -2), [4, 2, 3]);
  return !0;
};

