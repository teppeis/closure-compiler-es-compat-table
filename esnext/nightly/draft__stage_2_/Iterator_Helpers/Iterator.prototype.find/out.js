var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
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
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
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
$jscomp.polyfill = function(a, c, b, e) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, e) : $jscomp.polyfillUnisolated(a, c, b, e));
};
$jscomp.polyfillUnisolated = function(a, c, b, e) {
  b = $jscomp.global;
  a = a.split(".");
  for (e = 0; e < a.length - 1; e++) {
    var d = a[e];
    if (!(d in b)) {
      return;
    }
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
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  d = d[d.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? e[d] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== b && (void 0 === $jscomp.propertyToPolyfillSymbol[d] && (b = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + b + "$" + d), d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var c = function(f, g) {
    this.$jscomp$symbol$id_ = f;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:g});
  };
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var b = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", e = 0, d = function(f) {
    if (this instanceof d) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(b + (f || "") + "_" + e++, f);
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
    var e = $jscomp.global[c[b]];
    "function" === typeof e && "function" != typeof e.prototype[a] && $jscomp.defineProperty(e.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function(a, c) {
  a instanceof String && (a += "");
  var b = 0, e = !1, d = {next:function() {
    if (!e && b < a.length) {
      var f = b++;
      return {value:c(f, a[f]), done:!1};
    }
    e = !0;
    return {done:!0, value:void 0};
  }};
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
};
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(c, b) {
      return b;
    });
  };
}, "es8", "es3");
$jscomp.findInternal = function(a, c, b) {
  a instanceof String && (a = String(a));
  for (var e = a.length, d = 0; d < e; d++) {
    var f = a[d];
    if (c.call(b, f, d, a)) {
      return {i:d, v:f};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(c, b) {
    return $jscomp.findInternal(this, c, b).v;
  };
}, "es6", "es3");
module.exports = function() {
  return 1 === [1, 2, 3].values().find(function(a) {
    return a % 2;
  });
};

