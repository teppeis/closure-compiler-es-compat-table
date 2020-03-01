var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
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
$jscomp.polyfill("String.prototype.codePointAt", function(a) {
  return a ? a : function(b) {
    var a = $jscomp.checkStringArgs(this, null, "codePointAt"), d = a.length;
    b = Number(b) || 0;
    if (0 <= b && b < d) {
      b |= 0;
      var e = a.charCodeAt(b);
      if (55296 > e || 56319 < e || b + 1 === d) {
        return e;
      }
      b = a.charCodeAt(b + 1);
      return 56320 > b || 57343 < b ? e : 1024 * (e - 55296) + b + 9216;
    }
  };
}, "es6", "es3");
module.exports = function() {
  return 97 === "abc".codePointAt() && 97 === "abc".codePointAt(0) && 98 === "abc".codePointAt(1) && 98 === "abc".codePointAt(1) && 194564 === "\ud87e\udc04".codePointAt(0);
};

