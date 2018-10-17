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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(b) {
    return $jscomp.SYMBOL_PREFIX + (b || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
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
$jscomp.polyfill = function(a, b, d, c) {
  if (b) {
    d = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in d || (d[e] = {});
      d = d[e];
    }
    a = a[a.length - 1];
    c = d[a];
    b = b(c);
    b != c && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
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
    for (var e = 0; e < c.length; e++) {
      ("jscomp_symbol_" == c[e].substring(0, 14) ? a : b).push(c[e]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
module.exports = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  var a = Symbol(), b = Symbol(), d = Symbol(), c = {};
  c[a] = !0;
  a = Object.create(c);
  a[b] = !0;
  Object.defineProperty(a, d, {value:!0, enumerable:!1});
  a = Reflect.ownKeys(a);
  return -1 < a.indexOf(b) && -1 < a.indexOf(d) && 2 === a.length;
};

