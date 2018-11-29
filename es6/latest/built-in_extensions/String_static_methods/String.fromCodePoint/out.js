var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, b) {
  a != Array.prototype && a != Object.prototype && (a[e] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, e, b, d) {
  if (e) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var c = a[d];
      c in b || (b[c] = {});
      b = b[c];
    }
    a = a[a.length - 1];
    d = b[a];
    e = e(d);
    e != d && null != e && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.polyfill("String.fromCodePoint", function(a) {
  return a ? a : function(a) {
    for (var b = "", d = 0; d < arguments.length; d++) {
      var c = Number(arguments[d]);
      if (0 > c || 1114111 < c || c !== Math.floor(c)) {
        throw new RangeError("invalid_code_point " + c);
      }
      65535 >= c ? b += String.fromCharCode(c) : (c -= 65536, b += String.fromCharCode(c >>> 10 & 1023 | 55296), b += String.fromCharCode(c & 1023 | 56320));
    }
    return b;
  };
}, "es6", "es3");
module.exports = function() {
  return "" === String.fromCodePoint() && "*" === String.fromCodePoint(42) && "AZ" === String.fromCodePoint(65, 90) && "\ud87e\udc04" === String.fromCodePoint(194564);
};

