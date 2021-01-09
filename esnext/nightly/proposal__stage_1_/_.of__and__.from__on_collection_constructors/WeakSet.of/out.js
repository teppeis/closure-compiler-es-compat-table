var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) {
    return a[b];
  }
  c = a[c];
  return void 0 !== c ? c : a[b];
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
  for (var k = 0; k < f.length - 1; k++) {
    var h = f[k];
    if (!(h in d)) {
      return;
    }
    d = d[h];
  }
  f = f[f.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[f] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && (c = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + c + "$" + f), f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(d, f, {configurable:!0, writable:!0, value:b})));
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
    if (!$jscomp.owns(e, h)) {
      var g = new c;
      $jscomp.defineProperty(e, h, {value:g});
    }
  }
  function k(e) {
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
    if (!d(e)) {
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
    return d(e) && $jscomp.owns(e, h) ? e[h][this.id_] : void 0;
  };
  m.prototype.has = function(e) {
    return d(e) && $jscomp.owns(e, h) && $jscomp.owns(e[h], this.id_);
  };
  m.prototype.delete = function(e) {
    return d(e) && $jscomp.owns(e, h) && $jscomp.owns(e[h], this.id_) ? delete e[h][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), f = Object.seal({}), k = new a([d]);
      if (!k.has(d) || k.has(f)) {
        return !1;
      }
      k.delete(d);
      k.add(f);
      return !k.has(d) && k.has(f);
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
  var c = function(d) {
    this.map_ = new WeakMap;
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
  var a = {}, b = {}, c = WeakSet.of(a, b);
  return c.has(a) + c.has(b);
};

