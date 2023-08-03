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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
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
var $jscomp$lookupPolyfilledValue = function(a, b, c) {
  if (!c || null != a) {
    c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) {
      return a[b];
    }
    c = a[c];
    return void 0 !== c ? c : a[b];
  }
};
$jscomp.polyfill = function(a, b, c, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function(a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var f = a[d];
    if (!(f in c)) {
      return;
    }
    c = c[f];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, c, d) {
  var f = a.split(".");
  a = 1 === f.length;
  d = f[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < f.length - 1; h++) {
    var k = f[h];
    if (!(k in d)) {
      return;
    }
    d = d[k];
  }
  f = f[f.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[f] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && (c = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + c + "$" + f), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[f], {configurable:!0, writable:!0, value:b})));
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
  var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", d = 0, f = function(h) {
    if (this instanceof f) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b(c + (h || "") + "_" + d++, h);
  };
  return f;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = $jscomp.global[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && $jscomp.defineProperty(d.prototype, a, {configurable:!0, writable:!0, value:function() {
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
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(c, d, f) {
      return c == a && "q" == d && f == b;
    }}));
    return !0 === b.q;
  } catch (c) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return $jscomp.arrayIterator(a);
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
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
  function c() {
  }
  function d(e) {
    var g = typeof e;
    return "object" === g && null !== e || "function" === g;
  }
  function f(e) {
    if (!$jscomp.owns(e, k)) {
      var g = new c();
      $jscomp.defineProperty(e, k, {value:g});
    }
  }
  function h(e) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var g = Object[e];
      g && (Object[e] = function(l) {
        if (l instanceof c) {
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
    if (!d(e)) {
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
    return d(e) && $jscomp.owns(e, k) ? e[k][this.id_] : void 0;
  };
  m.prototype.has = function(e) {
    return d(e) && $jscomp.owns(e, k) && $jscomp.owns(e[k], this.id_);
  };
  m.prototype.delete = function(e) {
    return d(e) && $jscomp.owns(e, k) && $jscomp.owns(e[k], this.id_) ? delete e[k][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), f = Object.seal({}), h = new a([d]);
      if (!h.has(d) || h.has(f)) {
        return !1;
      }
      h.delete(d);
      h.add(f);
      return !h.has(d) && h.has(f);
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
  var c = function(d) {
    this.map_ = new WeakMap();
    if (d) {
      d = $jscomp.makeIterator(d);
      for (var f; !(f = d.next()).done;) {
        this.add(f.value);
      }
    }
  };
  c.prototype.add = function(d) {
    this.map_.set(d, !0);
    return this;
  };
  c.prototype.has = function(d) {
    return this.map_.has(d);
  };
  c.prototype.delete = function(d) {
    return this.map_.delete(d);
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  module.exports._ = Symbol.iterator;
  var a = !1, b = global.__createIterableObject([1, 2, 3], {"return":function() {
    a = !0;
    return {};
  }});
  try {
    new WeakSet(b);
  } catch (c) {
  }
  return a;
};

