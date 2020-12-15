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
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(d, b, e) {
      return d == a && "q" == b && e == c;
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
    var e = a[b];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  a = a[a.length - 1];
  b = d[a];
  c = c(b);
  c != b && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, d, b) {
  var e = a.split(".");
  a = 1 === e.length;
  b = e[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var k = 0; k < e.length - 1; k++) {
    var h = e[k];
    if (!(h in b)) {
      return;
    }
    b = b[h];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? b[e] : null;
  c = c(d);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e), e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(b, e, {configurable:!0, writable:!0, value:c})));
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
      var f = Object.seal({}), g = Object.seal({}), l = new a([[f, 2], [g, 3]]);
      if (2 != l.get(f) || 3 != l.get(g)) {
        return !1;
      }
      l.delete(f);
      l.set(g, 4);
      return !l.has(f) && 4 == l.get(g);
    } catch (p) {
      return !1;
    }
  }
  function d() {
  }
  function b(f) {
    var g = typeof f;
    return "object" === g && null !== f || "function" === g;
  }
  function e(f) {
    if (!$jscomp.owns(f, h)) {
      var g = new d;
      $jscomp.defineProperty(f, h, {value:g});
    }
  }
  function k(f) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var g = Object[f];
      g && (Object[f] = function(l) {
        if (l instanceof d) {
          return l;
        }
        Object.isExtensible(l) && e(l);
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
  var n = 0, m = function(f) {
    this.id_ = (n += Math.random() + 1).toString();
    if (f) {
      f = $jscomp.makeIterator(f);
      for (var g; !(g = f.next()).done;) {
        g = g.value, this.set(g[0], g[1]);
      }
    }
  };
  m.prototype.set = function(f, g) {
    if (!b(f)) {
      throw Error("Invalid WeakMap key");
    }
    e(f);
    if (!$jscomp.owns(f, h)) {
      throw Error("WeakMap key fail: " + f);
    }
    f[h][this.id_] = g;
    return this;
  };
  m.prototype.get = function(f) {
    return b(f) && $jscomp.owns(f, h) ? f[h][this.id_] : void 0;
  };
  m.prototype.has = function(f) {
    return b(f) && $jscomp.owns(f, h) && $jscomp.owns(f[h], this.id_);
  };
  m.prototype.delete = function(f) {
    return b(f) && $jscomp.owns(f, h) && $jscomp.owns(f[h], this.id_) ? delete f[h][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), e = Object.seal({}), k = new a([b]);
      if (!k.has(b) || k.has(e)) {
        return !1;
      }
      k.delete(b);
      k.add(e);
      return !k.has(b) && k.has(e);
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
      for (var e; !(e = b.next()).done;) {
        this.add(e.value);
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
  var a = {}, c = {}, d = {}, b = {}, e = new WeakSet([a, c]);
  e.addAll(d, b);
  return e.has(a) && e.has(c) && e.has(d) && e.has(b);
};

