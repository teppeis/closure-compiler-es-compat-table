var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
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
$jscomp.polyfill("Object.entries", function(a) {
  return a ? a : function(a) {
    var b = [], c;
    for (c in a) {
      $jscomp.owns(a, c) && b.push([c, a[c]]);
    }
    return b;
  };
}, "es8", "es3");
module.exports = function() {
  var a = Object.create({a:"qux", d:"qux"});
  a.a = "foo";
  a.b = "bar";
  a.c = "baz";
  a = Object.entries(a);
  return Array.isArray(a) && 3 === a.length && "a,foo" === String(a[0]) && "b,bar" === String(a[1]) && "c,baz" === String(a[2]);
};

