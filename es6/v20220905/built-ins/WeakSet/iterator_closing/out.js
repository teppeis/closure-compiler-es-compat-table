var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++],} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
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
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var d = $jscomp.propertyToPolyfillSymbol[b];
  if (null == d) {
    return a[b];
  }
  d = a[d];
  return void 0 !== d ? d : a[b];
};
$jscomp.polyfill = function(a, b, d, c) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, c) : $jscomp.polyfillUnisolated(a, b, d, c));
};
$jscomp.polyfillUnisolated = function(a, b, d, c) {
  d = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var f = a[c];
    if (!(f in d)) {
      return;
    }
    d = d[f];
  }
  a = a[a.length - 1];
  c = d[a];
  b = b(c);
  b != c && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, c) {
  var f = a.split(".");
  a = 1 === f.length;
  c = f[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < f.length - 1; h++) {
    var k = f[h];
    if (!(k in c)) {
      return;
    }
    c = c[k];
  }
  f = f[f.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? c[f] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:b}) : b !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && (d = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + d + "$" + f), $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[f], {configurable:!0, writable:!0, value:b})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(h, k) {
    this.$jscomp$symbol$id_ = h;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:k});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", c = 0, f = function(h) {
    if (this instanceof f) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b(d + (h || "") + "_" + c++, h);
  };
  return f;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
    var c = $jscomp.global[b[d]];
    "function" === typeof c && "function" != typeof c.prototype[a] && $jscomp.defineProperty(c.prototype, a, {configurable:!0, writable:!0, value:function() {
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
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(d, c, f) {
      return d == a && "q" == c && f == b;
    }}));
    return !0 === b.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({}), g = Object.seal({}), l = new a([[e, 2], [g, 3]]);
      if (2 != l.get(e) || 3 != l.get(g)) {
        return !1;
      }
      l.delete(e);
      l.set(g, 4);
      return !l.has(e) && 4 == l.get(g);
    } catch (p) {
      return !1;
    }
  }
  function d() {
  }
  function c(e) {
    var g = typeof e;
    return "object" === g && null !== e || "function" === g;
  }
  function f(e) {
    if (!$jscomp.owns(e, k)) {
      var g = new d();
      $jscomp.defineProperty(e, k, {value:g});
    }
  }
  function h(e) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var g = Object[e];
      g && (Object[e] = function(l) {
        if (l instanceof d) {
          return l;
        }
        Object.isExtensible(l) && f(l);
        return g(l);
      });
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (b()) {
      return a;
    }
  }
  var k = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var n = 0, m = function(e) {
    this.id_ = (n += Math.random() + 1).toString();
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var g; !(g = e.next()).done;) {
        g = g.value, this.set(g[0], g[1]);
      }
    }
  };
  m.prototype.set = function(e, g) {
    if (!c(e)) {
      throw Error("Invalid WeakMap key");
    }
    f(e);
    if (!$jscomp.owns(e, k)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[k][this.id_] = g;
    return this;
  };
  m.prototype.get = function(e) {
    return c(e) && $jscomp.owns(e, k) ? e[k][this.id_] : void 0;
  };
  m.prototype.has = function(e) {
    return c(e) && $jscomp.owns(e, k) && $jscomp.owns(e[k], this.id_);
  };
  m.prototype.delete = function(e) {
    return c(e) && $jscomp.owns(e, k) && $jscomp.owns(e[k], this.id_) ? delete e[k][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), f = Object.seal({}), h = new a([c]);
      if (!h.has(c) || h.has(f)) {
        return !1;
      }
      h.delete(c);
      h.add(f);
      return !h.has(c) && h.has(f);
    } catch (k) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (b()) {
      return a;
    }
  }
  var d = function(c) {
    this.map_ = new WeakMap();
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var f; !(f = c.next()).done;) {
        this.add(f.value);
      }
    }
  };
  d.prototype.add = function(c) {
    this.map_.set(c, !0);
    return this;
  };
  d.prototype.has = function(c) {
    return this.map_.has(c);
  };
  d.prototype.delete = function(c) {
    return this.map_.delete(c);
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  module.exports._ = Symbol.iterator;
  var a = !1, b = global.__createIterableObject([1, 2, 3], {"return":function() {
    a = !0;
    return {};
  }});
  try {
    new WeakSet(b);
  } catch (d) {
  }
  return a;
};

