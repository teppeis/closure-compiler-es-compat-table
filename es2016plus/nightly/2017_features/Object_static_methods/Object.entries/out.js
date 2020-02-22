var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
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
$jscomp.polyfill("Object.entries", function(a) {
  return a ? a : function(a) {
    var c = [], b;
    for (b in a) {
      $jscomp.owns(a, b) && c.push([b, a[b]]);
    }
    return c;
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

