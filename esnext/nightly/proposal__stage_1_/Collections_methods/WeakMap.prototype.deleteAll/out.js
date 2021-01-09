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
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(c, f, e) {
      return c == a && "q" == f && e == b;
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
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
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
$jscomp.polyfill = function(a, b, c, f) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, f) : $jscomp.polyfillUnisolated(a, b, c, f));
};
$jscomp.polyfillUnisolated = function(a, b, c, f) {
  c = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var e = a[f];
    if (!(e in c)) {
      return;
    }
    c = c[e];
  }
  a = a[a.length - 1];
  f = c[a];
  b = b(f);
  b != f && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, c, f) {
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
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? f[e] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (c = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + c + "$" + e), e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(f, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), g = Object.seal({}), k = new a([[d, 2], [g, 3]]);
      if (2 != k.get(d) || 3 != k.get(g)) {
        return !1;
      }
      k.delete(d);
      k.set(g, 4);
      return !k.has(d) && 4 == k.get(g);
    } catch (p) {
      return !1;
    }
  }
  function c() {
  }
  function f(d) {
    var g = typeof d;
    return "object" === g && null !== d || "function" === g;
  }
  function e(d) {
    if (!$jscomp.owns(d, h)) {
      var g = new c;
      $jscomp.defineProperty(d, h, {value:g});
    }
  }
  function l(d) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var g = Object[d];
      g && (Object[d] = function(k) {
        if (k instanceof c) {
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
  var n = 0, m = function(d) {
    this.id_ = (n += Math.random() + 1).toString();
    if (d) {
      d = $jscomp.makeIterator(d);
      for (var g; !(g = d.next()).done;) {
        g = g.value, this.set(g[0], g[1]);
      }
    }
  };
  m.prototype.set = function(d, g) {
    if (!f(d)) {
      throw Error("Invalid WeakMap key");
    }
    e(d);
    if (!$jscomp.owns(d, h)) {
      throw Error("WeakMap key fail: " + d);
    }
    d[h][this.id_] = g;
    return this;
  };
  m.prototype.get = function(d) {
    return f(d) && $jscomp.owns(d, h) ? d[h][this.id_] : void 0;
  };
  m.prototype.has = function(d) {
    return f(d) && $jscomp.owns(d, h) && $jscomp.owns(d[h], this.id_);
  };
  m.prototype.delete = function(d) {
    return f(d) && $jscomp.owns(d, h) && $jscomp.owns(d[h], this.id_) ? delete d[h][this.id_] : !1;
  };
  return m;
}, "es6", "es3");
module.exports = function() {
  var a = {}, b = {}, c = {}, f = {}, e = new WeakMap([[a, 1], [b, 2], [c, 3], [f, 4]]);
  e.deleteAll(a, c);
  return !e.has(a) && 2 === e.get(b) && !e.has(c) && 4 === e.get(f);
};

