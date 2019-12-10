var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, e) {
  a != Array.prototype && a != Object.prototype && (a[b] = e.value);
};
$jscomp.getGlobal = function(a) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(e) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + b++, e);
  }
  var b = 0;
  return a;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.polyfill = function(a, b, e, c) {
  if (b) {
    e = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var d = a[c];
      d in e || (e[d] = {});
      e = e[d];
    }
    a = a[a.length - 1];
    c = e[a];
    b = b(c);
    b != c && null != b && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var b = [], c = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var d = 0; d < c.length; d++) {
      ("jscomp_symbol_" == c[d].substring(0, 14) ? a : b).push(c[d]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.polyfill("Object.getOwnPropertyDescriptors", function(a) {
  return a ? a : function(a) {
    for (var b = {}, c = Reflect.ownKeys(a), d = 0; d < c.length; d++) {
      b[c[d]] = Object.getOwnPropertyDescriptor(a, c[d]);
    }
    return b;
  };
}, "es8", "es5");
module.exports = function() {
  var a = {a:1};
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  var b = "function" === typeof Symbol ? Symbol("b") : "b";
  a[b] = 2;
  a = Object.defineProperty(a, "c", {value:3});
  a = Object.getOwnPropertyDescriptors(a);
  return 1 === a.a.value && !0 === a.a.enumerable && !0 === a.a.configurable && !0 === a.a.writable && 2 === a[b].value && !0 === a[b].enumerable && !0 === a[b].configurable && !0 === a[b].writable && 3 === a.c.value && !1 === a.c.enumerable && !1 === a.c.configurable && !1 === a.c.writable;
};

