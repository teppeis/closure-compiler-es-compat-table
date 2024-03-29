var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(f, g, k) {
      return f == a && "q" == g && k == e;
    }}));
    return !0 === e.q;
  } catch (f) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var e = 0;
  return function() {
    return e < a.length ? {done:!1, value:a[e++]} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, f) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[e] = f.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, e, f) {
  if (!f || null != a) {
    f = $jscomp.propertyToPolyfillSymbol[e];
    if (null == f) {
      return a[e];
    }
    f = a[f];
    return void 0 !== f ? f : a[e];
  }
};
$jscomp.polyfill = function(a, e, f, g) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, e, f, g) : $jscomp.polyfillUnisolated(a, e, f, g));
};
$jscomp.polyfillUnisolated = function(a, e, f, g) {
  f = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var k = a[g];
    if (!(k in f)) {
      return;
    }
    f = f[k];
  }
  a = a[a.length - 1];
  g = f[a];
  e = e(g);
  e != g && null != e && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(a, e, f, g) {
  var k = a.split(".");
  a = 1 === k.length;
  g = k[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < k.length - 1; m++) {
    var l = k[m];
    if (!(l in g)) {
      return;
    }
    g = g[l];
  }
  k = k[k.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? g[k] : null;
  e = e(f);
  null != e && (a ? $jscomp.defineProperty($jscomp.polyfills, k, {configurable:!0, writable:!0, value:e}) : e !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[k] && (f = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[k] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(k) : $jscomp.POLYFILL_PREFIX + f + "$" + k), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[k], {configurable:!0, writable:!0, value:e})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var e = function(m, l) {
    this.$jscomp$symbol$id_ = m;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:l});
  };
  e.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var f = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", g = 0, k = function(m) {
    if (this instanceof k) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new e(f + (m || "") + "_" + g++, m);
  };
  return k;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var e = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), f = 0; f < e.length; f++) {
    var g = $jscomp.global[e[f]];
    "function" === typeof g && "function" != typeof g.prototype[a] && $jscomp.defineProperty(g.prototype, a, {configurable:!0, writable:!0, value:function() {
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
$jscomp.makeIterator = function(a) {
  var e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (e) {
    return e.call(a);
  }
  if ("number" == typeof a.length) {
    return $jscomp.arrayIterator(a);
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
};
$jscomp.owns = function(a, e) {
  return Object.prototype.hasOwnProperty.call(a, e);
};
$jscomp.polyfill("WeakMap", function(a) {
  function e() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), d = Object.seal({}), h = new a([[b, 2], [d, 3]]);
      if (2 != h.get(b) || 3 != h.get(d)) {
        return !1;
      }
      h.delete(b);
      h.set(d, 4);
      return !h.has(b) && 4 == h.get(d);
    } catch (n) {
      return !1;
    }
  }
  function f() {
  }
  function g(b) {
    var d = typeof b;
    return "object" === d && null !== b || "function" === d;
  }
  function k(b) {
    if (!$jscomp.owns(b, l)) {
      var d = new f();
      $jscomp.defineProperty(b, l, {value:d});
    }
  }
  function m(b) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var d = Object[b];
      d && (Object[b] = function(h) {
        if (h instanceof f) {
          return h;
        }
        Object.isExtensible(h) && k(h);
        return d(h);
      });
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (e()) {
      return a;
    }
  }
  var l = "$jscomp_hidden_" + Math.random();
  m("freeze");
  m("preventExtensions");
  m("seal");
  var p = 0, c = function(b) {
    this.id_ = (p += Math.random() + 1).toString();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var d; !(d = b.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  c.prototype.set = function(b, d) {
    if (!g(b)) {
      throw Error("Invalid WeakMap key");
    }
    k(b);
    if (!$jscomp.owns(b, l)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[l][this.id_] = d;
    return this;
  };
  c.prototype.get = function(b) {
    return g(b) && $jscomp.owns(b, l) ? b[l][this.id_] : void 0;
  };
  c.prototype.has = function(b) {
    return g(b) && $jscomp.owns(b, l) && $jscomp.owns(b[l], this.id_);
  };
  c.prototype.delete = function(b) {
    return g(b) && $jscomp.owns(b, l) && $jscomp.owns(b[l], this.id_) ? delete b[l][this.id_] : !1;
  };
  return c;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != b.get(c) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var d = b.entries(), h = d.next();
      if (h.done || h.value[0] != c || "s" != h.value[1]) {
        return !1;
      }
      h = d.next();
      return h.done || 4 != h.value[0].x || "t" != h.value[1] || !d.next().done ? !1 : !0;
    } catch (n) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (e()) {
      return a;
    }
  }
  var f = new WeakMap(), g = function(c) {
    this[0] = {};
    this[1] = l();
    this.size = 0;
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var b; !(b = c.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  g.prototype.set = function(c, b) {
    c = 0 === c ? 0 : c;
    var d = k(this, c);
    d.list || (d.list = this[0][d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this[1], previous:this[1].previous, head:this[1], key:c, value:b}, d.list.push(d.entry), this[1].previous.next = d.entry, this[1].previous = d.entry, this.size++);
    return this;
  };
  g.prototype.delete = function(c) {
    c = k(this, c);
    return c.entry && c.list ? (c.list.splice(c.index, 1), c.list.length || delete this[0][c.id], c.entry.previous.next = c.entry.next, c.entry.next.previous = c.entry.previous, c.entry.head = null, this.size--, !0) : !1;
  };
  g.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].previous = l();
    this.size = 0;
  };
  g.prototype.has = function(c) {
    return !!k(this, c).entry;
  };
  g.prototype.get = function(c) {
    return (c = k(this, c).entry) && c.value;
  };
  g.prototype.entries = function() {
    return m(this, function(c) {
      return [c.key, c.value];
    });
  };
  g.prototype.keys = function() {
    return m(this, function(c) {
      return c.key;
    });
  };
  g.prototype.values = function() {
    return m(this, function(c) {
      return c.value;
    });
  };
  g.prototype.forEach = function(c, b) {
    for (var d = this.entries(), h; !(h = d.next()).done;) {
      h = h.value, c.call(b, h[1], h[0], this);
    }
  };
  g.prototype[Symbol.iterator] = g.prototype.entries;
  var k = function(c, b) {
    var d = b && typeof b;
    "object" == d || "function" == d ? f.has(b) ? d = f.get(b) : (d = "" + ++p, f.set(b, d)) : d = "p_" + b;
    var h = c[0][d];
    if (h && $jscomp.owns(c[0], d)) {
      for (c = 0; c < h.length; c++) {
        var n = h[c];
        if (b !== b && n.key !== n.key || b === n.key) {
          return {id:d, list:h, index:c, entry:n};
        }
      }
    }
    return {id:d, list:h, index:-1, entry:void 0};
  }, m = function(c, b) {
    var d = c[1];
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != c[1];) {
          d = d.previous;
        }
        for (; d.next != d.head;) {
          return d = d.next, {done:!1, value:b(d)};
        }
        d = null;
      }
      return {done:!0, value:void 0};
    });
  }, l = function() {
    var c = {};
    return c.previous = c.next = c.head = c;
  }, p = 0;
  return g;
}, "es6", "es3");
module.exports = function() {
  var a = new Map();
  return a.set(0, 0) === a;
};

