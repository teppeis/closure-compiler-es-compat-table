var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.construct = function() {
  function a() {
    function a() {
    }
    new a;
    Reflect.construct(a, [], function() {
    });
    return new a instanceof a;
  }
  if ("undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var b = Reflect.construct;
    return function(a, e, c) {
      a = b(a, e);
      c && Reflect.setPrototypeOf(a, c.prototype);
      return a;
    };
  }
  return function(a, b, c) {
    void 0 === c && (c = a);
    c = $jscomp.objectCreate(c.prototype || Object.prototype);
    return Function.prototype.apply.call(a, c, b) || c;
  };
}();
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
};
$jscomp.getGlobal = function(a) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, d, e) {
  if (b) {
    d = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var c = a[e];
      c in d || (d[c] = {});
      d = d[c];
    }
    a = a[a.length - 1];
    e = d[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Reflect.construct", function(a) {
  return $jscomp.construct;
}, "es6", "es3");
module.exports = function() {
  function a() {
  }
  var b = Reflect.construct(RegExp, ["baz", "g"], a);
  return "baz" === RegExp.prototype.exec.call(b, "foobarbaz")[0] && 9 === b.lastIndex && b instanceof a;
};

