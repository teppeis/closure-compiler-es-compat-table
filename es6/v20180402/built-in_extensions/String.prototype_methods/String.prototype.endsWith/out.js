var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, c, b) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined");
  }
  if (c instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
  }
  return a + "";
};
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
$jscomp.polyfill("String.prototype.endsWith", function(a) {
  return a ? a : function(a, b) {
    var d = $jscomp.checkStringArgs(this, a, "endsWith");
    a += "";
    void 0 === b && (b = d.length);
    b = Math.max(0, Math.min(b | 0, d.length));
    for (var c = a.length; 0 < c && 0 < b;) {
      if (d[--b] != a[--c]) {
        return !1;
      }
    }
    return 0 >= c;
  };
}, "es6", "es3");
module.exports = function() {
  return "foobar".endsWith("bar");
};

