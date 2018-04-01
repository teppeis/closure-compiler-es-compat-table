var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, b, c) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    c = b[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  return a ? a : function(a, b, c) {
    var d = this.length;
    a = Number(a);
    b = Number(b);
    c = Number(null != c ? c : d);
    if (a < b) {
      for (c = Math.min(c, d); b < c;) {
        b in this ? this[a++] = this[b++] : (delete this[a++], b++);
      }
    } else {
      for (c = Math.min(c, d + b - a), a += c - b; c > b;) {
        --c in this ? this[--a] = this[c] : delete this[a];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(d, b, c) {
    a.push(b);
    d[b] = c;
    return !0;
  }})).copyWithin(0, 3);
  return "0,1,2" === a + "";
};

