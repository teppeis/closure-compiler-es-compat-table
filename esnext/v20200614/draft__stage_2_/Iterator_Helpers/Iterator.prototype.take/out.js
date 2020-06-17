var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
    if (b && b.Math == Math) {
      return b;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var b = $jscomp.propertyToPolyfillSymbol[c];
  if (null == b) {
    return a[c];
  }
  b = a[b];
  return void 0 !== b ? b : a[c];
};
$jscomp.polyfill = function(a, c, b, d) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, d) : $jscomp.polyfillUnisolated(a, c, b, d));
};
$jscomp.polyfillUnisolated = function(a, c, b, d) {
  b = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    if (!(e in b)) {
      return;
    }
    b = b[e];
  }
  a = a[a.length - 1];
  d = b[a];
  c = c(d);
  c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, b, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    if (!(g in d)) {
      return;
    }
    d = d[g];
  }
  e = e[e.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? d[e] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== b && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(d, e, {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, b, d) {
    b = null != b ? b : function(a) {
      return a;
    };
    var c = [], f = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof f) {
      a = f.call(a);
      for (var g = 0; !(f = a.next()).done;) {
        c.push(b.call(d, f.value, g++));
      }
    } else {
      for (f = a.length, g = 0; g < f; g++) {
        c.push(b.call(d, a[g], g));
      }
    }
    return c;
  };
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var c = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var b = 0, d = function(a) {
    if (this instanceof d) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c("jscomp_symbol_" + (a || "") + "_" + b++, a);
  };
  return d;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
    var d = $jscomp.global[c[b]];
    "function" === typeof d && "function" != typeof d.prototype[a] && $jscomp.defineProperty(d.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.initSymbolAsyncIterator = function() {
};
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function(a, c) {
  a instanceof String && (a += "");
  var b = 0, d = {next:function() {
    if (b < a.length) {
      var e = b++;
      return {value:c(e, a[e]), done:!1};
    }
    d.next = function() {
      return {done:!0, value:void 0};
    };
    return d.next();
  }};
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
};
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, b) {
      return b;
    });
  };
}, "es8", "es3");
module.exports = function() {
  return "1,2" === Array.from([1, 2, 3].values().take(2)).join();
};

