var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var h = 0; h < a.length; ++h) {
    var e = a[h];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, h = Object.create(new $jscomp.global.Proxy(a, {get:function(e, b, g) {
      return e == a && "q" == b && g == h;
    }}));
    return !0 === h.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var h = 0;
  return function() {
    return h < a.length ? {done:!1, value:a[h++], } : {done:!0};
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
$jscomp.ENABLE_UNHANDLED_REJECTION_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, h, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[h] = e.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, h) {
  var e = $jscomp.propertyToPolyfillSymbol[h];
  if (null == e) {
    return a[h];
  }
  e = a[e];
  return void 0 !== e ? e : a[h];
};
$jscomp.polyfill = function(a, h, e, b) {
  h && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, h, e, b) : $jscomp.polyfillUnisolated(a, h, e, b));
};
$jscomp.polyfillUnisolated = function(a, h, e, b) {
  e = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var g = a[b];
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  a = a[a.length - 1];
  b = e[a];
  h = h(b);
  h != b && null != h && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:h});
};
$jscomp.polyfillIsolated = function(a, h, e, b) {
  var g = a.split(".");
  a = 1 === g.length;
  b = g[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < g.length - 1; m++) {
    var l = g[m];
    if (!(l in b)) {
      return;
    }
    b = b[l];
  }
  g = g[g.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? b[g] : null;
  h = h(e);
  null != h && (a ? $jscomp.defineProperty($jscomp.polyfills, g, {configurable:!0, writable:!0, value:h}) : h !== e && ($jscomp.propertyToPolyfillSymbol[g] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(g) : $jscomp.POLYFILL_PREFIX + g, g = $jscomp.propertyToPolyfillSymbol[g], $jscomp.defineProperty(b, g, {configurable:!0, writable:!0, value:h})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var h = function(g, m) {
    this.$jscomp$symbol$id_ = g;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  h.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = 0, b = function(g) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new h("jscomp_symbol_" + (g || "") + "_" + e++, g);
  };
  return b;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var h = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < h.length; e++) {
    var b = $jscomp.global[h[e]];
    "function" === typeof b && "function" != typeof b.prototype[a] && $jscomp.defineProperty(b.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.initSymbolAsyncIterator = function() {
};
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function(a) {
  var h = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return h ? h.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, h) {
  return Object.prototype.hasOwnProperty.call(a, h);
};
$jscomp.polyfill("WeakMap", function(a) {
  function h() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), f = Object.seal({}), k = new a([[c, 2], [f, 3]]);
      if (2 != k.get(c) || 3 != k.get(f)) {
        return !1;
      }
      k.delete(c);
      k.set(f, 4);
      return !k.has(c) && 4 == k.get(f);
    } catch (n) {
      return !1;
    }
  }
  function e() {
  }
  function b(c) {
    var f = typeof c;
    return "object" === f && null !== c || "function" === f;
  }
  function g(c) {
    if (!$jscomp.owns(c, l)) {
      var f = new e;
      $jscomp.defineProperty(c, l, {value:f});
    }
  }
  function m(c) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var f = Object[c];
      f && (Object[c] = function(k) {
        if (k instanceof e) {
          return k;
        }
        Object.isExtensible(k) && g(k);
        return f(k);
      });
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (h()) {
      return a;
    }
  }
  var l = "$jscomp_hidden_" + Math.random();
  m("freeze");
  m("preventExtensions");
  m("seal");
  var p = 0, d = function(c) {
    this.id_ = (p += Math.random() + 1).toString();
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var f; !(f = c.next()).done;) {
        f = f.value, this.set(f[0], f[1]);
      }
    }
  };
  d.prototype.set = function(c, f) {
    if (!b(c)) {
      throw Error("Invalid WeakMap key");
    }
    g(c);
    if (!$jscomp.owns(c, l)) {
      throw Error("WeakMap key fail: " + c);
    }
    c[l][this.id_] = f;
    return this;
  };
  d.prototype.get = function(c) {
    return b(c) && $jscomp.owns(c, l) ? c[l][this.id_] : void 0;
  };
  d.prototype.has = function(c) {
    return b(c) && $jscomp.owns(c, l) && $jscomp.owns(c[l], this.id_);
  };
  d.prototype.delete = function(c) {
    return b(c) && $jscomp.owns(c, l) && $jscomp.owns(c[l], this.id_) ? delete c[l][this.id_] : !1;
  };
  return d;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function h() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), c = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != c.get(d) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var f = c.entries(), k = f.next();
      if (k.done || k.value[0] != d || "s" != k.value[1]) {
        return !1;
      }
      k = f.next();
      return k.done || 4 != k.value[0].x || "t" != k.value[1] || !f.next().done ? !1 : !0;
    } catch (n) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (h()) {
      return a;
    }
  }
  var e = new WeakMap, b = function(d) {
    this.data_ = {};
    this.head_ = l();
    this.size = 0;
    if (d) {
      d = $jscomp.makeIterator(d);
      for (var c; !(c = d.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  b.prototype.set = function(d, c) {
    d = 0 === d ? 0 : d;
    var f = g(this, d);
    f.list || (f.list = this.data_[f.id] = []);
    f.entry ? f.entry.value = c : (f.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:d, value:c, }, f.list.push(f.entry), this.head_.previous.next = f.entry, this.head_.previous = f.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(d) {
    d = g(this, d);
    return d.entry && d.list ? (d.list.splice(d.index, 1), d.list.length || delete this.data_[d.id], d.entry.previous.next = d.entry.next, d.entry.next.previous = d.entry.previous, d.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = l();
    this.size = 0;
  };
  b.prototype.has = function(d) {
    return !!g(this, d).entry;
  };
  b.prototype.get = function(d) {
    return (d = g(this, d).entry) && d.value;
  };
  b.prototype.entries = function() {
    return m(this, function(d) {
      return [d.key, d.value];
    });
  };
  b.prototype.keys = function() {
    return m(this, function(d) {
      return d.key;
    });
  };
  b.prototype.values = function() {
    return m(this, function(d) {
      return d.value;
    });
  };
  b.prototype.forEach = function(d, c) {
    for (var f = this.entries(), k; !(k = f.next()).done;) {
      k = k.value, d.call(c, k[1], k[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var g = function(d, c) {
    var f = c && typeof c;
    "object" == f || "function" == f ? e.has(c) ? f = e.get(c) : (f = "" + ++p, e.set(c, f)) : f = "p_" + c;
    var k = d.data_[f];
    if (k && $jscomp.owns(d.data_, f)) {
      for (d = 0; d < k.length; d++) {
        var n = k[d];
        if (c !== c && n.key !== n.key || c === n.key) {
          return {id:f, list:k, index:d, entry:n};
        }
      }
    }
    return {id:f, list:k, index:-1, entry:void 0};
  }, m = function(d, c) {
    var f = d.head_;
    return $jscomp.iteratorPrototype(function() {
      if (f) {
        for (; f.head != d.head_;) {
          f = f.previous;
        }
        for (; f.next != f.head;) {
          return f = f.next, {done:!1, value:c(f)};
        }
        f = null;
      }
      return {done:!0, value:void 0};
    });
  }, l = function() {
    var d = {};
    return d.previous = d.next = d.head = d;
  }, p = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function h() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), g = new a($jscomp.makeIterator([b]));
      if (!g.has(b) || 1 != g.size || g.add(b) != g || 1 != g.size || g.add({x:4}) != g || 2 != g.size) {
        return !1;
      }
      var m = g.entries(), l = m.next();
      if (l.done || l.value[0] != b || l.value[1] != b) {
        return !1;
      }
      l = m.next();
      return l.done || l.value[0] == b || 4 != l.value[0].x || l.value[1] != l.value[0] ? !1 : m.next().done;
    } catch (p) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (h()) {
      return a;
    }
  }
  var e = function(b) {
    this.map_ = new Map;
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var g; !(g = b.next()).done;) {
        this.add(g.value);
      }
    }
    this.size = this.map_.size;
  };
  e.prototype.add = function(b) {
    b = 0 === b ? 0 : b;
    this.map_.set(b, b);
    this.size = this.map_.size;
    return this;
  };
  e.prototype.delete = function(b) {
    b = this.map_.delete(b);
    this.size = this.map_.size;
    return b;
  };
  e.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  e.prototype.has = function(b) {
    return this.map_.has(b);
  };
  e.prototype.entries = function() {
    return this.map_.entries();
  };
  e.prototype.values = function() {
    return this.map_.values();
  };
  e.prototype.keys = e.prototype.values;
  e.prototype[Symbol.iterator] = e.prototype.values;
  e.prototype.forEach = function(b, g) {
    var m = this;
    this.map_.forEach(function(l) {
      return b.call(g, l, l, m);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.findInternal = function(a, h, e) {
  a instanceof String && (a = String(a));
  for (var b = a.length, g = 0; g < b; g++) {
    var m = a[g];
    if (h.call(e, m, g, a)) {
      return {i:g, v:m};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(h, e) {
    return $jscomp.findInternal(this, h, e).v;
  };
}, "es6", "es3");
module.exports = function() {
  return 2 === (new Set([1, 2, 3])).find(function(a) {
    return !(a % 2);
  });
};

