var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
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
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, c) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(b) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (b || "") + "_" + c++, b);
  }
  var c = 0;
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
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = $jscomp.ISOLATE_POLYFILLS && "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var b = $jscomp.propertyToPolyfillSymbol[c];
  if (null == b) {
    return a[c];
  }
  b = a[b];
  return void 0 !== b ? b : a[c];
};
$jscomp.polyfill = function(a, c, b, e) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, e) : $jscomp.polyfillUnisolated(a, c, b, e));
};
$jscomp.polyfillUnisolated = function(a, c, b, e) {
  b = $jscomp.global;
  a = a.split(".");
  for (e = 0; e < a.length - 1; e++) {
    var d = a[e];
    d in b || (b[d] = {});
    b = b[d];
  }
  a = a[a.length - 1];
  e = b[a];
  c = c(e);
  c != e && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, b, e) {
  var d = a.split(".");
  a = 1 === d.length;
  e = d[0];
  e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < d.length - 1; f++) {
    var g = d[f];
    g in e || (e[g] = {});
    e = e[g];
  }
  d = d[d.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? e[d] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== b && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("String.prototype.matchAll", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbolIterator();
  return function(a) {
    if (a instanceof RegExp && !a.global) {
      throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
    }
    var b = new RegExp(a, a instanceof RegExp ? void 0 : "g"), c = this, d = !1, f = {next:function() {
      var a = {}, e = b.lastIndex;
      if (d) {
        return {value:void 0, done:!0};
      }
      var f = b.exec(c);
      if (!f) {
        return d = !0, {value:void 0, done:!0};
      }
      b.lastIndex === e && (b.lastIndex += 1);
      a.value = f;
      a.done = !1;
      return a;
    }};
    f[Symbol.iterator] = function() {
      return f;
    };
    return f;
  };
}, "es_2020", "es3");
module.exports = function() {
  var a = "11a2bb".matchAll(/(\d)(\D)/g);
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  if (a[Symbol.iterator]() !== a) {
    return !1;
  }
  for (var c = "", b = "", e = "", d; !(d = a.next()).done;) {
    c += d.value[0], b += d.value[1], e += d.value[2];
  }
  return "1a2b" === c && "12" === b && "ab" === e;
};

