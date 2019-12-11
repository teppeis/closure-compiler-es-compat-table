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
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
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
$jscomp.polyfill("String.prototype.codePointAt", function(a) {
  return a ? a : function(a) {
    var b = $jscomp.checkStringArgs(this, null, "codePointAt"), c = b.length;
    a = Number(a) || 0;
    if (0 <= a && a < c) {
      a |= 0;
      var d = b.charCodeAt(a);
      if (55296 > d || 56319 < d || a + 1 === c) {
        return d;
      }
      a = b.charCodeAt(a + 1);
      return 56320 > a || 57343 < a ? d : 1024 * (d - 55296) + a + 9216;
    }
  };
}, "es6", "es3");
module.exports = function() {
  return 97 === "abc".codePointAt() && 97 === "abc".codePointAt(0) && 98 === "abc".codePointAt(1) && 98 === "abc".codePointAt(1) && 194564 === "\ud87e\udc04".codePointAt(0);
};

