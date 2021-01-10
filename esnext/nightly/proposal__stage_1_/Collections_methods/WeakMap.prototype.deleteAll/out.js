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
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(d, f, e) {
      return d == a && "q" == f && e == b;
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
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
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
$jscomp.polyfill = function(a, b, d, f) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, f) : $jscomp.polyfillUnisolated(a, b, d, f));
};
$jscomp.polyfillUnisolated = function(a, b, d, f) {
  d = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var e = a[f];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  a = a[a.length - 1];
  f = d[a];
  b = b(f);
  b != f && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, f) {
  var e = a.split(".");
  a = 1 === e.length;
  f = e[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < e.length - 1; l++) {
    var h = e[l];
    if (!(h in f)) {
      return;
    }
    f = f[h];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? f[e] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e), e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(f, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), g = Object.seal({}), k = new a([[c, 2], [g, 3]]);
      if (2 != k.get(c) || 3 != k.get(g)) {
        return !1;
      }
      k.delete(c);
      k.set(g, 4);
      return !k.has(c) && 4 == k.get(g);
    } catch (p) {
      return !1;
    }
  }
  function d() {
  }
  function f(c) {
    var g = typeof c;
    return "object" === g && null !== c || "function" === g;
  }
  function e(c) {
    if (!$jscomp.owns(c, h)) {
      var g = new d;
      $jscomp.defineProperty(c, h, {value:g});
    }
  }
  function l(c) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var g = Object[c];
      g && (Object[c] = function(k) {
        if (k instanceof d) {
          return k;
        }
        Object.isExtensible(k) && e(k);
        return g(k);
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
  l("freeze");
  l("preventExtensions");
  l("seal");
  var n = 0, m = function(c) {
    this.id_ = (n += Math.random() + 1).toString();
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var g; !(g = c.next()).done;) {
        g = g.value, this.set(g[0], g[1]);
      }
    }
  };
  m.prototype.set = function(c, g) {
    if (!f(c)) {
      throw Error("Invalid WeakMap key");
    }
    e(c);
    if (!$jscomp.owns(c, h)) {
      throw Error("WeakMap key fail: " + c);
    }
    c[h][this.id_] = g;
    return this;
  };
  m.prototype.get = function(c) {
    return f(c) && $jscomp.owns(c, h) ? c[h][this.id_] : void 0;
  };
  m.prototype.has = function(c) {
    return f(c) && $jscomp.owns(c, h) && $jscomp.owns(c[h], this.id_);
  };
  m.prototype.delete = function(c) {
    return f(c) && $jscomp.owns(c, h) && $jscomp.owns(c[h], this.id_) ? delete c[h][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
module.exports = function() {
  var a = {}, b = {}, d = {}, f = {}, e = new WeakMap([[a, 1], [b, 2], [d, 3], [f, 4]]);
  e.deleteAll(a, d);
  return !e.has(a) && 2 === e.get(b) && !e.has(d) && 4 === e.get(f);
};

