var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(d, b, f) {
      return d == a && "q" == b && f == c;
    }}));
    return !0 === c.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = d.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var d = $jscomp.propertyToPolyfillSymbol[c];
  if (null == d) {
    return a[c];
  }
  d = a[d];
  return void 0 !== d ? d : a[c];
};
$jscomp.polyfill = function(a, c, d, b) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, d, b) : $jscomp.polyfillUnisolated(a, c, d, b));
};
$jscomp.polyfillUnisolated = function(a, c, d, b) {
  d = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var f = a[b];
    if (!(f in d)) {
      return;
    }
    d = d[f];
  }
  a = a[a.length - 1];
  b = d[a];
  c = c(b);
  c != b && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, d, b) {
  var f = a.split(".");
  a = 1 === f.length;
  b = f[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var k = 0; k < f.length - 1; k++) {
    var h = f[k];
    if (!(h in b)) {
      return;
    }
    b = b[h];
  }
  f = f[f.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? b[f] : null;
  c = c(d);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:c}) : c !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && (d = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + d + "$" + f), f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(b, f, {configurable:!0, writable:!0, value:c})));
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
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
  function b(e) {
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
    if (c()) {
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
    if (!b(e)) {
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
    return b(e) && $jscomp.owns(e, h) ? e[h][this.id_] : void 0;
  };
  m.prototype.has = function(e) {
    return b(e) && $jscomp.owns(e, h) && $jscomp.owns(e[h], this.id_);
  };
  m.prototype.delete = function(e) {
    return b(e) && $jscomp.owns(e, h) && $jscomp.owns(e[h], this.id_) ? delete e[h][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), f = Object.seal({}), k = new a([b]);
      if (!k.has(b) || k.has(f)) {
        return !1;
      }
      k.delete(b);
      k.add(f);
      return !k.has(b) && k.has(f);
    } catch (h) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (c()) {
      return a;
    }
  }
  var d = function(b) {
    this.map_ = new WeakMap;
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var f; !(f = b.next()).done;) {
        this.add(f.value);
      }
    }
  };
  d.prototype.add = function(b) {
    this.map_.set(b, !0);
    return this;
  };
  d.prototype.has = function(b) {
    return this.map_.has(b);
  };
  d.prototype.delete = function(b) {
    return this.map_.delete(b);
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  new WeakSet;
  try {
    return WeakSet(), !1;
  } catch (a) {
    return !0;
  }
};

