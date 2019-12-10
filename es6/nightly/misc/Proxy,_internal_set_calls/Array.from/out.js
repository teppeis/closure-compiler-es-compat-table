var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var g = a[d];
      g in c || (c[g] = {});
      c = c[g];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, c, d) {
    c = null != c ? c : function(a) {
      return a;
    };
    var b = [], e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof e) {
      a = e.call(a);
      for (var f = 0; !(e = a.next()).done;) {
        b.push(c.call(d, e.value, f++));
      }
    } else {
      for (e = a.length, f = 0; f < e; f++) {
        b.push(c.call(d, a[f], f));
      }
    }
    return b;
  };
}, "es6", "es3");
module.exports = function() {
  var a = [], b = new Proxy({}, {set:function(c, b, g) {
    a.push(b);
    c[b] = g;
    return !0;
  }});
  Array.from.call(function() {
    return b;
  }, {length:2, 0:1, 1:2});
  return "length" === a + "";
};

