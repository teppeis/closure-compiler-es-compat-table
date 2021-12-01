var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
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
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(f, g, h) {
      return f == a && "q" == g && h == e;
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
    return e < a.length ? {done:!1, value:a[e++],} : {done:!0};
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
var $jscomp$lookupPolyfilledValue = function(a, e) {
  var f = $jscomp.propertyToPolyfillSymbol[e];
  if (null == f) {
    return a[e];
  }
  f = a[f];
  return void 0 !== f ? f : a[e];
};
$jscomp.polyfill = function(a, e, f, g) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, e, f, g) : $jscomp.polyfillUnisolated(a, e, f, g));
};
$jscomp.polyfillUnisolated = function(a, e, f, g) {
  f = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var h = a[g];
    if (!(h in f)) {
      return;
    }
    f = f[h];
  }
  a = a[a.length - 1];
  g = f[a];
  e = e(g);
  e != g && null != e && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(a, e, f, g) {
  var h = a.split(".");
  a = 1 === h.length;
  g = h[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < h.length - 1; m++) {
    var l = h[m];
    if (!(l in g)) {
      return;
    }
    g = g[l];
  }
  h = h[h.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? g[h] : null;
  e = e(f);
  null != e && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:e}) : e !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && (f = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + f + "$" + h), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:e})));
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
  var f = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", g = 0, h = function(m) {
    if (this instanceof h) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new e(f + (m || "") + "_" + g++, m);
  };
  return h;
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
  return e ? e.call(a) : $jscomp.arrayIterator(a);
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
      var b = Object.seal({}), d = Object.seal({}), k = new a([[b, 2], [d, 3]]);
      if (2 != k.get(b) || 3 != k.get(d)) {
        return !1;
      }
      k.delete(b);
      k.set(d, 4);
      return !k.has(b) && 4 == k.get(d);
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
  function h(b) {
    if (!$jscomp.owns(b, l)) {
      var d = new f();
      $jscomp.defineProperty(b, l, {value:d});
    }
  }
  function m(b) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var d = Object[b];
      d && (Object[b] = function(k) {
        if (k instanceof f) {
          return k;
        }
        Object.isExtensible(k) && h(k);
        return d(k);
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
    h(b);
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
      var d = b.entries(), k = d.next();
      if (k.done || k.value[0] != c || "s" != k.value[1]) {
        return !1;
      }
      k = d.next();
      return k.done || 4 != k.value[0].x || "t" != k.value[1] || !d.next().done ? !1 : !0;
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
    this.data_ = {};
    this.head_ = l();
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
    var d = h(this, c);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:c, value:b,}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  g.prototype.delete = function(c) {
    c = h(this, c);
    return c.entry && c.list ? (c.list.splice(c.index, 1), c.list.length || delete this.data_[c.id], c.entry.previous.next = c.entry.next, c.entry.next.previous = c.entry.previous, c.entry.head = null, this.size--, !0) : !1;
  };
  g.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = l();
    this.size = 0;
  };
  g.prototype.has = function(c) {
    return !!h(this, c).entry;
  };
  g.prototype.get = function(c) {
    return (c = h(this, c).entry) && c.value;
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
    for (var d = this.entries(), k; !(k = d.next()).done;) {
      k = k.value, c.call(b, k[1], k[0], this);
    }
  };
  g.prototype[Symbol.iterator] = g.prototype.entries;
  var h = function(c, b) {
    var d = b && typeof b;
    "object" == d || "function" == d ? f.has(b) ? d = f.get(b) : (d = "" + ++p, f.set(b, d)) : d = "p_" + b;
    var k = c.data_[d];
    if (k && $jscomp.owns(c.data_, d)) {
      for (c = 0; c < k.length; c++) {
        var n = k[c];
        if (b !== b && n.key !== n.key || b === n.key) {
          return {id:d, list:k, index:c, entry:n};
        }
      }
    }
    return {id:d, list:k, index:-1, entry:void 0};
  }, m = function(c, b) {
    var d = c.head_;
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != c.head_;) {
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
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(e, f, g) {
    f = null != f ? f : function(p) {
      return p;
    };
    var h = [], m = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator];
    if ("function" == typeof m) {
      e = m.call(e);
      for (var l = 0; !(m = e.next()).done;) {
        h.push(f.call(g, m.value, l++));
      }
    } else {
      for (m = e.length, l = 0; l < m; l++) {
        h.push(f.call(g, e[l], l));
      }
    }
    return h;
  };
}, "es6", "es3");
module.exports = function() {
  var a = new Map([["a", 1]]);
  return 2 !== a.upsert("a", function(e) {
    return 2;
  }, function() {
    return 3;
  }) || 3 !== a.upsert("b", function(e) {
    return 2;
  }, function() {
    return 3;
  }) ? !1 : "a,2,b,3" === Array.from(a).join();
};

