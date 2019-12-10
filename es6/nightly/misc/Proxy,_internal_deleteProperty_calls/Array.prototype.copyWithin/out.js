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
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, b, c) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var f = a[c];
      f in b || (b[f] = {});
      b = b[f];
    }
    a = a[a.length - 1];
    c = b[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  function d(b) {
    b = Number(b);
    return Infinity === b || -Infinity === b ? b : b | 0;
  }
  return a ? a : function(b, c, a) {
    var e = this.length;
    b = d(b);
    c = d(c);
    a = void 0 === a ? e : d(a);
    b = 0 > b ? Math.max(e + b, 0) : Math.min(b, e);
    c = 0 > c ? Math.max(e + c, 0) : Math.min(c, e);
    a = 0 > a ? Math.max(e + a, 0) : Math.min(a, e);
    if (b < c) {
      for (; c < a;) {
        c in this ? this[b++] = this[c++] : (delete this[b++], c++);
      }
    } else {
      for (a = Math.min(a, e + c - b), b += a - c; a > c;) {
        --a in this ? this[--b] = this[a] : delete this[--b];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = [];
  (new Proxy([0, 0, 0, , , , ], {deleteProperty:function(d, b) {
    a.push(b);
    return delete d[b];
  }})).copyWithin(0, 3);
  return "0,1,2" === a + "";
};

