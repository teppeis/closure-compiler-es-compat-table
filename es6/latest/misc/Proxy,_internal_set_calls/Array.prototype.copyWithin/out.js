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
  throw Error("Cannot find global object");
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
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  function c(b) {
    b = Number(b);
    return Infinity === b || -Infinity === b ? b : b | 0;
  }
  return a ? a : function(b, a, e) {
    var d = this.length;
    b = c(b);
    a = c(a);
    e = void 0 === e ? d : c(e);
    b = 0 > b ? Math.max(d + b, 0) : Math.min(b, d);
    a = 0 > a ? Math.max(d + a, 0) : Math.min(a, d);
    e = 0 > e ? Math.max(d + e, 0) : Math.min(e, d);
    if (b < a) {
      for (; a < e;) {
        a in this ? this[b++] = this[a++] : (delete this[b++], a++);
      }
    } else {
      for (e = Math.min(e, d + a - b), b += e - a; e > a;) {
        --e in this ? this[--b] = this[e] : delete this[--b];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).copyWithin(0, 3);
  return "0,1,2" === a + "";
};

