var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
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
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
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
  for (var k = 0; k < f.length - 1; k++) {
    var h = f[k];
    if (!(h in c)) {
      return;
    }
    c = c[h];
  }
  f = f[f.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? c[f] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:b}) : b !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f), f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(c, f, {configurable:!0, writable:!0, value:b})));
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
    if (!$jscomp.owns(e, h)) {
      var g = new d;
      $jscomp.defineProperty(e, h, {value:g});
    }
  }
  function k(e) {
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
  var h = "$jscomp_hidden_" + Math.random();
  k("freeze");
  k("preventExtensions");
  k("seal");
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
    if (!$jscomp.owns(e, h)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[h][this.id_] = g;
    return this;
  };
  m.prototype.get = function(e) {
    return c(e) && $jscomp.owns(e, h) ? e[h][this.id_] : void 0;
  };
  m.prototype.has = function(e) {
    return c(e) && $jscomp.owns(e, h) && $jscomp.owns(e[h], this.id_);
  };
  m.prototype.delete = function(e) {
    return c(e) && $jscomp.owns(e, h) && $jscomp.owns(e[h], this.id_) ? delete e[h][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), f = Object.seal({}), k = new a([c]);
      if (!k.has(c) || k.has(f)) {
        return !1;
      }
      k.delete(c);
      k.add(f);
      return !k.has(c) && k.has(f);
    } catch (h) {
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
    this.map_ = new WeakMap;
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
  var a = {}, b = {}, d = new WeakSet([a, b]);
  return d.has(a) && d.has(b);
};

