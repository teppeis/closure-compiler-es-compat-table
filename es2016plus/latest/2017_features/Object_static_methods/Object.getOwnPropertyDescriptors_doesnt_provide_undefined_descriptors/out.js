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
$jscomp.polyfill = function(a, b, c, e) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in c || (c[d] = {});
      c = c[d];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var c = [], b = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var d = 0; d < b.length; d++) {
      ("jscomp_symbol_" == b[d].substring(0, 14) ? a : c).push(b[d]);
    }
    return c.concat(a);
  };
}, "es6", "es5");
$jscomp.polyfill("Object.getOwnPropertyDescriptors", function(a) {
  return a ? a : function(a) {
    for (var c = {}, b = Reflect.ownKeys(a), d = 0; d < b.length; d++) {
      c[b[d]] = Object.getOwnPropertyDescriptor(a, b[d]);
    }
    return c;
  };
}, "es8", "es5");
module.exports = function() {
  var a = new Proxy({a:1}, {getOwnPropertyDescriptor:function(a, c) {
  }});
  return !Object.getOwnPropertyDescriptors(a).hasOwnProperty("a");
};

