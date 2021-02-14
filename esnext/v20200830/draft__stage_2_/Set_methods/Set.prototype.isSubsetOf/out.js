var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var g = 0; g < a.length; ++g) {
    var f = a[g];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, g = Object.create(new $jscomp.global.Proxy(a, {get:function(f, b, h) {
      return f == a && "q" == b && h == g;
    }}));
    return !0 === g.q;
  } catch (f) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var g = 0;
  return function() {
    return g < a.length ? {done:!1, value:a[g++], } : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, g, f) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[g] = f.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, g) {
  var f = $jscomp.propertyToPolyfillSymbol[g];
  if (null == f) {
    return a[g];
  }
  f = a[f];
  return void 0 !== f ? f : a[g];
};
$jscomp.polyfill = function(a, g, f, b) {
  g && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, g, f, b) : $jscomp.polyfillUnisolated(a, g, f, b));
};
$jscomp.polyfillUnisolated = function(a, g, f, b) {
  f = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var h = a[b];
    if (!(h in f)) {
      return;
    }
    f = f[h];
  }
  a = a[a.length - 1];
  b = f[a];
  g = g(b);
  g != b && null != g && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:g});
};
$jscomp.polyfillIsolated = function(a, g, f, b) {
  var h = a.split(".");
  a = 1 === h.length;
  b = h[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < h.length - 1; m++) {
    var l = h[m];
    if (!(l in b)) {
      return;
    }
    b = b[l];
  }
  h = h[h.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? b[h] : null;
  g = g(f);
  null != g && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:g}) : g !== f && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h, h = $jscomp.propertyToPolyfillSymbol[h], $jscomp.defineProperty(b, h, {configurable:!0, writable:!0, value:g})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var g = function(h, m) {
    this.$jscomp$symbol$id_ = h;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  g.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var f = 0, b = function(h) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new g("jscomp_symbol_" + (h || "") + "_" + f++, h);
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
  for (var g = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), f = 0; f < g.length; f++) {
    var b = $jscomp.global[g[f]];
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
  var g = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return g ? g.call(a) : $jscomp.arrayIterator(a);
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
      var c = Object.seal({}), e = Object.seal({}), k = new a([[c, 2], [e, 3]]);
      if (2 != k.get(c) || 3 != k.get(e)) {
        return !1;
      }
      k.delete(c);
      k.set(e, 4);
      return !k.has(c) && 4 == k.get(e);
    } catch (n) {
      return !1;
    }
  }
  function f() {
  }
  function b(c) {
    var e = typeof c;
    return "object" === e && null !== c || "function" === e;
  }
  function h(c) {
    if (!$jscomp.owns(c, l)) {
      var e = new f;
      $jscomp.defineProperty(c, l, {value:e});
    }
  }
  function m(c) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var e = Object[c];
      e && (Object[c] = function(k) {
        if (k instanceof f) {
          return k;
        }
        Object.isExtensible(k) && h(k);
        return e(k);
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
  var l = "$jscomp_hidden_" + Math.random();
  m("freeze");
  m("preventExtensions");
  m("seal");
  var p = 0, d = function(c) {
    this.id_ = (p += Math.random() + 1).toString();
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var e; !(e = c.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  d.prototype.set = function(c, e) {
    if (!b(c)) {
      throw Error("Invalid WeakMap key");
    }
    h(c);
    if (!$jscomp.owns(c, l)) {
      throw Error("WeakMap key fail: " + c);
    }
    c[l][this.id_] = e;
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
  function g() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), c = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != c.get(d) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var e = c.entries(), k = e.next();
      if (k.done || k.value[0] != d || "s" != k.value[1]) {
        return !1;
      }
      k = e.next();
      return k.done || 4 != k.value[0].x || "t" != k.value[1] || !e.next().done ? !1 : !0;
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
  var f = new WeakMap, b = function(d) {
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
    var e = h(this, d);
    e.list || (e.list = this.data_[e.id] = []);
    e.entry ? e.entry.value = c : (e.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:d, value:c, }, e.list.push(e.entry), this.head_.previous.next = e.entry, this.head_.previous = e.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(d) {
    d = h(this, d);
    return d.entry && d.list ? (d.list.splice(d.index, 1), d.list.length || delete this.data_[d.id], d.entry.previous.next = d.entry.next, d.entry.next.previous = d.entry.previous, d.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = l();
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
    for (var e = this.entries(), k; !(k = e.next()).done;) {
      k = k.value, d.call(c, k[1], k[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var h = function(d, c) {
    var e = c && typeof c;
    "object" == e || "function" == e ? f.has(c) ? e = f.get(c) : (e = "" + ++p, f.set(c, e)) : e = "p_" + c;
    var k = d.data_[e];
    if (k && $jscomp.owns(d.data_, e)) {
      for (d = 0; d < k.length; d++) {
        var n = k[d];
        if (c !== c && n.key !== n.key || c === n.key) {
          return {id:e, list:k, index:d, entry:n};
        }
      }
    }
    return {id:e, list:k, index:-1, entry:void 0};
  }, m = function(d, c) {
    var e = d.head_;
    return $jscomp.iteratorPrototype(function() {
      if (e) {
        for (; e.head != d.head_;) {
          e = e.previous;
        }
        for (; e.next != e.head;) {
          return e = e.next, {done:!1, value:c(e)};
        }
        e = null;
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
  function g() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), h = new a($jscomp.makeIterator([b]));
      if (!h.has(b) || 1 != h.size || h.add(b) != h || 1 != h.size || h.add({x:4}) != h || 2 != h.size) {
        return !1;
      }
      var m = h.entries(), l = m.next();
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
    if (g()) {
      return a;
    }
  }
  var f = function(b) {
    this.map_ = new Map;
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var h; !(h = b.next()).done;) {
        this.add(h.value);
      }
    }
    this.size = this.map_.size;
  };
  f.prototype.add = function(b) {
    b = 0 === b ? 0 : b;
    this.map_.set(b, b);
    this.size = this.map_.size;
    return this;
  };
  f.prototype.delete = function(b) {
    b = this.map_.delete(b);
    this.size = this.map_.size;
    return b;
  };
  f.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  f.prototype.has = function(b) {
    return this.map_.has(b);
  };
  f.prototype.entries = function() {
    return this.map_.entries();
  };
  f.prototype.values = function() {
    return this.map_.values();
  };
  f.prototype.keys = f.prototype.values;
  f.prototype[Symbol.iterator] = f.prototype.values;
  f.prototype.forEach = function(b, h) {
    var m = this;
    this.map_.forEach(function(l) {
      return b.call(h, l, l, m);
    });
  };
  return f;
}, "es6", "es3");
module.exports = function() {
  return (new Set([1, 2, 3])).isSubsetOf([5, 4, 3, 2, 1]);
};

