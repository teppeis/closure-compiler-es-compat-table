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
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var d = 0; d < a.length; ++d) {
    var b = a[d];
    if (b && b.Math == Math) {
      return b;
    }
  }
  return globalThis;
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
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  function d(b) {
    b = Number(b);
    return Infinity === b || -Infinity === b ? b : b | 0;
  }
  return a ? a : function(b, a, c) {
    var e = this.length;
    b = d(b);
    a = d(a);
    c = void 0 === c ? e : d(c);
    b = 0 > b ? Math.max(e + b, 0) : Math.min(b, e);
    a = 0 > a ? Math.max(e + a, 0) : Math.min(a, e);
    c = 0 > c ? Math.max(e + c, 0) : Math.min(c, e);
    if (b < a) {
      for (; a < c;) {
        a in this ? this[b++] = this[a++] : (delete this[b++], a++);
      }
    } else {
      for (c = Math.min(c, e + a - b), b += c - a; c > a;) {
        --c in this ? this[--b] = this[c] : delete this[--b];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = require("assert");
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(), [1, 2, 3, 4, 5]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(2), [1, 2, 1, 2, 3]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 1, 2]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
  a.deepEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
  return !0;
};

