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
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
    if (b && b.Math == Math) {
      return b;
    }
  }
  throw Error("Cannot find global object");
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
$jscomp.polyfill("String.fromCodePoint", function(a) {
  return a ? a : function(a) {
    for (var b = "", c = 0; c < arguments.length; c++) {
      var d = Number(arguments[c]);
      if (0 > d || 1114111 < d || d !== Math.floor(d)) {
        throw new RangeError("invalid_code_point " + d);
      }
      65535 >= d ? b += String.fromCharCode(d) : (d -= 65536, b += String.fromCharCode(d >>> 10 & 1023 | 55296), b += String.fromCharCode(d & 1023 | 56320));
    }
    return b;
  };
}, "es6", "es3");
module.exports = function() {
  return "" === String.fromCodePoint() && "*" === String.fromCodePoint(42) && "AZ" === String.fromCodePoint(65, 90) && "\ud87e\udc04" === String.fromCodePoint(194564);
};

