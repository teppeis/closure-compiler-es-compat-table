var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
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
$jscomp.polyfill("Object.assign", function(a) {
  return a ? a : function(a, b) {
    for (var d = 1; d < arguments.length; d++) {
      var c = arguments[d];
      if (c) {
        for (var f in c) {
          $jscomp.owns(c, f) && (a[f] = c[f]);
        }
      }
    }
    return a;
  };
}, "es6", "es3");
module.exports = function() {
  var a = "", c = {};
  "012349 DBACEFGHIJKLMNOPQRST".split("").concat(-1).forEach(function(b) {
    Object.defineProperty(c, b, {set:function() {
      a += b;
    }});
  });
  var b = {2:2, 0:0, 1:1, " ":" ", 9:9, D:"D", B:"B", "-1":"-1"};
  Object.defineProperty(b, "A", {value:"A", enumerable:!0});
  Object.defineProperty(b, "3", {value:"3", enumerable:!0});
  Object.defineProperty(b, "C", {value:"C", enumerable:!0});
  Object.defineProperty(b, "4", {value:"4", enumerable:!0});
  delete b[2];
  b[2] = !0;
  "EFGHIJKLMNOPQRST".split("").forEach(function(a) {
    b[a] = a;
  });
  Object.assign(c, b);
  return "012349 DB-1ACEFGHIJKLMNOPQRST" === a;
};

