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
$jscomp.polyfill = function(a, c, b, f) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (f = 0; f < a.length - 1; f++) {
      var d = a[f];
      d in b || (b[d] = {});
      b = b[d];
    }
    a = a[a.length - 1];
    f = b[a];
    c = c(f);
    c != f && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.prototype.copyWithin", function(a) {
  function c(b) {
    b = Number(b);
    return Infinity === b || -Infinity === b ? b : b | 0;
  }
  return a ? a : function(b, a, d) {
    var e = this.length;
    b = c(b);
    a = c(a);
    d = void 0 === d ? e : c(d);
    b = 0 > b ? Math.max(e + b, 0) : Math.min(b, e);
    a = 0 > a ? Math.max(e + a, 0) : Math.min(a, e);
    d = 0 > d ? Math.max(e + d, 0) : Math.min(d, e);
    if (b < a) {
      for (; a < d;) {
        a in this ? this[b++] = this[a++] : (delete this[b++], a++);
      }
    } else {
      for (d = Math.min(d, e + a - b), b += d - a; d > a;) {
        --d in this ? this[--b] = this[d] : delete this[--b];
      }
    }
    return this;
  };
}, "es6", "es3");
module.exports = function() {
  var a = [];
  (new Proxy([0, 0, 0, , , , ], {deleteProperty:function(c, b) {
    a.push(b);
    return delete c[b];
  }})).copyWithin(0, 3);
  return "0,1,2" === a + "";
};

