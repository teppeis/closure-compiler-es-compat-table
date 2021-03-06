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
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
    if (b && b.Math == Math) {
      return b;
    }
  }
  return globalThis;
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
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(a, b, d) {
    var c = this.length || 0;
    0 > b && (b = Math.max(0, c + b));
    if (null == d || d > c) {
      d = c;
    }
    d = Number(d);
    0 > d && (d = Math.max(0, c + d));
    for (b = Number(b || 0); b < d; b++) {
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

