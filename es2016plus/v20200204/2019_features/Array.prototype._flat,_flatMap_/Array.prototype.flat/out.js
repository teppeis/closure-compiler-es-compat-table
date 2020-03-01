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
$jscomp.polyfill("Array.prototype.flat", function(a) {
  return a ? a : function(a) {
    a = void 0 === a ? 1 : a;
    for (var b = [], c = 0; c < this.length; c++) {
      var d = this[c];
      Array.isArray(d) && 0 < a ? (d = Array.prototype.flat.call(d, a - 1), b.push.apply(b, d)) : b.push(d);
    }
    return b;
  };
}, "es9", "es5");
module.exports = function() {
  return "12345,6" === [1, [2, 3], [4, [5, 6]]].flat().join("");
};

