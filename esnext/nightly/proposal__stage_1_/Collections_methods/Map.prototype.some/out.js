var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < a.length; ++e) {
    var g = a[e];
    if (g && g.Math == Math) {
      return g;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(g, f, h) {
      return g == a && "q" == f && h == e;
    }}));
    return !0 === e.q;
  } catch (g) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var e = 0;
  return function() {
    return e < a.length ? {done:!1, value:a[e++], } : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, g) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[e] = g.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, e) {
  var g = $jscomp.propertyToPolyfillSymbol[e];
  if (null == g) {
    return a[e];
  }
  g = a[g];
  return void 0 !== g ? g : a[e];
};
$jscomp.polyfill = function(a, e, g, f) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, e, g, f) : $jscomp.polyfillUnisolated(a, e, g, f));
};
$jscomp.polyfillUnisolated = function(a, e, g, f) {
  g = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var h = a[f];
    if (!(h in g)) {
      return;
    }
    g = g[h];
  }
  a = a[a.length - 1];
  f = g[a];
  e = e(f);
  e != f && null != e && $jscomp.defineProperty(g, a, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(a, e, g, f) {
  var h = a.split(".");
  a = 1 === h.length;
  f = h[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < h.length - 1; m++) {
    var l = h[m];
    if (!(l in f)) {
      return;
    }
    f = f[l];
  }
  h = h[h.length - 1];
  g = $jscomp.IS_SYMBOL_NATIVE && "es6" === g ? f[h] : null;
  e = e(g);
  null != e && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:e}) : e !== g && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h, h = $jscomp.propertyToPolyfillSymbol[h], $jscomp.defineProperty(f, h, {configurable:!0, writable:!0, value:e})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var e = function(h, m) {
    this.$jscomp$symbol$id_ = h;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  e.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var g = 0, f = function(h) {
    if (this instanceof f) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new e("jscomp_symbol_" + (h || "") + "_" + g++, h);
  };
  return f;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var e = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), g = 0; g < e.length; g++) {
    var f = $jscomp.global[e[g]];
    "function" === typeof f && "function" != typeof f.prototype[a] && $jscomp.defineProperty(f.prototype, a, {configurable:!0, writable:!0, value:function() {
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
  function g() {
  }
  function f(b) {
    var d = typeof b;
    return "object" === d && null !== b || "function" === d;
  }
  function h(b) {
    if (!$jscomp.owns(b, l)) {
      var d = new g;
      $jscomp.defineProperty(b, l, {value:d});
    }
  }
  function m(b) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var d = Object[b];
      d && (Object[b] = function(k) {
        if (k instanceof g) {
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
    if (!f(b)) {
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
    return f(b) && $jscomp.owns(b, l) ? b[l][this.id_] : void 0;
  };
  c.prototype.has = function(b) {
    return f(b) && $jscomp.owns(b, l) && $jscomp.owns(b[l], this.id_);
  };
  c.prototype.delete = function(b) {
    return f(b) && $jscomp.owns(b, l) && $jscomp.owns(b[l], this.id_) ? delete b[l][this.id_] : !1;
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
  var g = new WeakMap, f = function(c) {
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
  f.prototype.set = function(c, b) {
    c = 0 === c ? 0 : c;
    var d = h(this, c);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:c, value:b, }, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  f.prototype.delete = function(c) {
    c = h(this, c);
    return c.entry && c.list ? (c.list.splice(c.index, 1), c.list.length || delete this.data_[c.id], c.entry.previous.next = c.entry.next, c.entry.next.previous = c.entry.previous, c.entry.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = l();
    this.size = 0;
  };
  f.prototype.has = function(c) {
    return !!h(this, c).entry;
  };
  f.prototype.get = function(c) {
    return (c = h(this, c).entry) && c.value;
  };
  f.prototype.entries = function() {
    return m(this, function(c) {
      return [c.key, c.value];
    });
  };
  f.prototype.keys = function() {
    return m(this, function(c) {
      return c.key;
    });
  };
  f.prototype.values = function() {
    return m(this, function(c) {
      return c.value;
    });
  };
  f.prototype.forEach = function(c, b) {
    for (var d = this.entries(), k; !(k = d.next()).done;) {
      k = k.value, c.call(b, k[1], k[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var h = function(c, b) {
    var d = b && typeof b;
    "object" == d || "function" == d ? g.has(b) ? d = g.get(b) : (d = "" + ++p, g.set(b, d)) : d = "p_" + b;
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
  return f;
}, "es6", "es3");
module.exports = function() {
  return (new Map([[1, 4], [2, 5], [3, 6]])).some(function(a) {
    return a % 2;
  });
};

