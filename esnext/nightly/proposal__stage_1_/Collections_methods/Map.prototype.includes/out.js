var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var d = 0; d < a.length; ++d) {
    var e = a[d];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(e, g, h) {
      return e == a && "q" == g && h == d;
    }}));
    return !0 === d.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++], } : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = e.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var e = $jscomp.propertyToPolyfillSymbol[d];
  if (null == e) {
    return a[d];
  }
  e = a[e];
  return void 0 !== e ? e : a[d];
};
$jscomp.polyfill = function(a, d, e, g) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, e, g) : $jscomp.polyfillUnisolated(a, d, e, g));
};
$jscomp.polyfillUnisolated = function(a, d, e, g) {
  e = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var h = a[g];
    if (!(h in e)) {
      return;
    }
    e = e[h];
  }
  a = a[a.length - 1];
  g = e[a];
  d = d(g);
  d != g && null != d && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, e, g) {
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
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? g[h] : null;
  d = d(e);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:d}) : d !== e && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:d})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var d = function(h, m) {
    this.$jscomp$symbol$id_ = h;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = 0, g = function(h) {
    if (this instanceof g) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d("jscomp_symbol_" + (h || "") + "_" + e++, h);
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var d = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < d.length; e++) {
    var g = $jscomp.global[d[e]];
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
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), f = Object.seal({}), k = new a([[b, 2], [f, 3]]);
      if (2 != k.get(b) || 3 != k.get(f)) {
        return !1;
      }
      k.delete(b);
      k.set(f, 4);
      return !k.has(b) && 4 == k.get(f);
    } catch (n) {
      return !1;
    }
  }
  function e() {
  }
  function g(b) {
    var f = typeof b;
    return "object" === f && null !== b || "function" === f;
  }
  function h(b) {
    if (!$jscomp.owns(b, l)) {
      var f = new e;
      $jscomp.defineProperty(b, l, {value:f});
    }
  }
  function m(b) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var f = Object[b];
      f && (Object[b] = function(k) {
        if (k instanceof e) {
          return k;
        }
        Object.isExtensible(k) && h(k);
        return f(k);
      });
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (d()) {
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
      for (var f; !(f = b.next()).done;) {
        f = f.value, this.set(f[0], f[1]);
      }
    }
  };
  c.prototype.set = function(b, f) {
    if (!g(b)) {
      throw Error("Invalid WeakMap key");
    }
    h(b);
    if (!$jscomp.owns(b, l)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[l][this.id_] = f;
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
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != b.get(c) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var f = b.entries(), k = f.next();
      if (k.done || k.value[0] != c || "s" != k.value[1]) {
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
    if (d()) {
      return a;
    }
  }
  var e = new WeakMap, g = function(c) {
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
    var f = h(this, c);
    f.list || (f.list = this.data_[f.id] = []);
    f.entry ? f.entry.value = b : (f.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:c, value:b, }, f.list.push(f.entry), this.head_.previous.next = f.entry, this.head_.previous = f.entry, this.size++);
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
    for (var f = this.entries(), k; !(k = f.next()).done;) {
      k = k.value, c.call(b, k[1], k[0], this);
    }
  };
  g.prototype[Symbol.iterator] = g.prototype.entries;
  var h = function(c, b) {
    var f = b && typeof b;
    "object" == f || "function" == f ? e.has(b) ? f = e.get(b) : (f = "" + ++p, e.set(b, f)) : f = "p_" + b;
    var k = c.data_[f];
    if (k && $jscomp.owns(c.data_, f)) {
      for (c = 0; c < k.length; c++) {
        var n = k[c];
        if (b !== b && n.key !== n.key || b === n.key) {
          return {id:f, list:k, index:c, entry:n};
        }
      }
    }
    return {id:f, list:k, index:-1, entry:void 0};
  }, m = function(c, b) {
    var f = c.head_;
    return $jscomp.iteratorPrototype(function() {
      if (f) {
        for (; f.head != c.head_;) {
          f = f.previous;
        }
        for (; f.next != f.head;) {
          return f = f.next, {done:!1, value:b(f)};
        }
        f = null;
      }
      return {done:!0, value:void 0};
    });
  }, l = function() {
    var c = {};
    return c.previous = c.next = c.head = c;
  }, p = 0;
  return g;
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(d, e) {
    return d === e ? 0 !== d || 1 / d === 1 / e : d !== d && e !== e;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(a) {
  return a ? a : function(d, e) {
    var g = this;
    g instanceof String && (g = String(g));
    var h = g.length;
    e = e || 0;
    for (0 > e && (e = Math.max(e + h, 0)); e < h; e++) {
      var m = g[e];
      if (m === d || Object.is(m, d)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function(a, d, e) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + e + " must not be null or undefined");
  }
  if (d instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + e + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.includes", function(a) {
  return a ? a : function(d, e) {
    return -1 !== $jscomp.checkStringArgs(this, d, "includes").indexOf(d, e || 0);
  };
}, "es6", "es3");
module.exports = function() {
  return (new Map([[1, 2], [2, NaN]])).includes(2) && (new Map([[1, 2], [2, NaN]])).includes(NaN);
};

