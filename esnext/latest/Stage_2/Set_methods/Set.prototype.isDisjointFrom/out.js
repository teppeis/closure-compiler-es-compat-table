var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var g = 0; g < a.length; ++g) {
    var e = a[g];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, g = Object.create(new $jscomp.global.Proxy(a, {get:function(e, b, h) {
      return e == a && "q" == b && h == g;
    }}));
    return !0 === g.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var g = 0;
  return function() {
    return g < a.length ? {done:!1, value:a[g++],} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, g, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[g] = e.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, g, e) {
  if (!e || null != a) {
    e = $jscomp.propertyToPolyfillSymbol[g];
    if (null == e) {
      return a[g];
    }
    e = a[e];
    return void 0 !== e ? e : a[g];
  }
};
$jscomp.polyfill = function(a, g, e, b) {
  g && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, g, e, b) : $jscomp.polyfillUnisolated(a, g, e, b));
};
$jscomp.polyfillUnisolated = function(a, g, e, b) {
  e = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var h = a[b];
    if (!(h in e)) {
      return;
    }
    e = e[h];
  }
  a = a[a.length - 1];
  b = e[a];
  g = g(b);
  g != b && null != g && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:g});
};
$jscomp.polyfillIsolated = function(a, g, e, b) {
  var h = a.split(".");
  a = 1 === h.length;
  b = h[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < h.length - 1; m++) {
    var k = h[m];
    if (!(k in b)) {
      return;
    }
    b = b[k];
  }
  h = h[h.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? b[h] : null;
  g = g(e);
  null != g && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:g}) : g !== e && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && (e = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + e + "$" + h), $jscomp.defineProperty(b, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:g})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var g = function(m, k) {
    this.$jscomp$symbol$id_ = m;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:k});
  };
  g.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", b = 0, h = function(m) {
    if (this instanceof h) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new g(e + (m || "") + "_" + b++, m);
  };
  return h;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var g = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < g.length; e++) {
    var b = $jscomp.global[g[e]];
    "function" === typeof b && "function" != typeof b.prototype[a] && $jscomp.defineProperty(b.prototype, a, {configurable:!0, writable:!0, value:function() {
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
  var g = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (g) {
    return g.call(a);
  }
  if ("number" == typeof a.length) {
    return $jscomp.arrayIterator(a);
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
};
$jscomp.owns = function(a, g) {
  return Object.prototype.hasOwnProperty.call(a, g);
};
$jscomp.polyfill("WeakMap", function(a) {
  function g() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), f = Object.seal({}), l = new a([[c, 2], [f, 3]]);
      if (2 != l.get(c) || 3 != l.get(f)) {
        return !1;
      }
      l.delete(c);
      l.set(f, 4);
      return !l.has(c) && 4 == l.get(f);
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
  function h(c) {
    if (!$jscomp.owns(c, k)) {
      var f = new e();
      $jscomp.defineProperty(c, k, {value:f});
    }
  }
  function m(c) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var f = Object[c];
      f && (Object[c] = function(l) {
        if (l instanceof e) {
          return l;
        }
        Object.isExtensible(l) && h(l);
        return f(l);
      });
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (g()) {
      return a;
    }
  }
  var k = "$jscomp_hidden_" + Math.random();
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
    h(c);
    if (!$jscomp.owns(c, k)) {
      throw Error("WeakMap key fail: " + c);
    }
    c[k][this.id_] = f;
    return this;
  };
  d.prototype.get = function(c) {
    return b(c) && $jscomp.owns(c, k) ? c[k][this.id_] : void 0;
  };
  d.prototype.has = function(c) {
    return b(c) && $jscomp.owns(c, k) && $jscomp.owns(c[k], this.id_);
  };
  d.prototype.delete = function(c) {
    return b(c) && $jscomp.owns(c, k) && $jscomp.owns(c[k], this.id_) ? delete c[k][this.id_] : !1;
  };
  return d;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function g() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), c = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != c.get(d) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var f = c.entries(), l = f.next();
      if (l.done || l.value[0] != d || "s" != l.value[1]) {
        return !1;
      }
      l = f.next();
      return l.done || 4 != l.value[0].x || "t" != l.value[1] || !f.next().done ? !1 : !0;
    } catch (n) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (g()) {
      return a;
    }
  }
  var e = new WeakMap(), b = function(d) {
    this.data_ = {};
    this.head_ = k();
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
    var f = h(this, d);
    f.list || (f.list = this.data_[f.id] = []);
    f.entry ? f.entry.value = c : (f.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:d, value:c,}, f.list.push(f.entry), this.head_.previous.next = f.entry, this.head_.previous = f.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(d) {
    d = h(this, d);
    return d.entry && d.list ? (d.list.splice(d.index, 1), d.list.length || delete this.data_[d.id], d.entry.previous.next = d.entry.next, d.entry.next.previous = d.entry.previous, d.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = k();
    this.size = 0;
  };
  b.prototype.has = function(d) {
    return !!h(this, d).entry;
  };
  b.prototype.get = function(d) {
    return (d = h(this, d).entry) && d.value;
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
    for (var f = this.entries(), l; !(l = f.next()).done;) {
      l = l.value, d.call(c, l[1], l[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var h = function(d, c) {
    var f = c && typeof c;
    "object" == f || "function" == f ? e.has(c) ? f = e.get(c) : (f = "" + ++p, e.set(c, f)) : f = "p_" + c;
    var l = d.data_[f];
    if (l && $jscomp.owns(d.data_, f)) {
      for (d = 0; d < l.length; d++) {
        var n = l[d];
        if (c !== c && n.key !== n.key || c === n.key) {
          return {id:f, list:l, index:d, entry:n};
        }
      }
    }
    return {id:f, list:l, index:-1, entry:void 0};
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
  }, k = function() {
    var d = {};
    return d.previous = d.next = d.head = d;
  }, p = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function g() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), h = new a($jscomp.makeIterator([b]));
      if (!h.has(b) || 1 != h.size || h.add(b) != h || 1 != h.size || h.add({x:4}) != h || 2 != h.size) {
        return !1;
      }
      var m = h.entries(), k = m.next();
      if (k.done || k.value[0] != b || k.value[1] != b) {
        return !1;
      }
      k = m.next();
      return k.done || k.value[0] == b || 4 != k.value[0].x || k.value[1] != k.value[0] ? !1 : m.next().done;
    } catch (p) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (g()) {
      return a;
    }
  }
  var e = function(b) {
    this.map_ = new Map();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var h; !(h = b.next()).done;) {
        this.add(h.value);
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
  e.prototype.forEach = function(b, h) {
    var m = this;
    this.map_.forEach(function(k) {
      return b.call(h, k, k, m);
    });
  };
  return e;
}, "es6", "es3");
module.exports = function() {
  return (new Set([1, 2, 3])).isDisjointFrom([4, 5, 6]);
};

