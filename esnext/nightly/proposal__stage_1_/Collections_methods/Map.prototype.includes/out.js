var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < a.length; ++e) {
    var d = a[e];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(d, g, h) {
      return d == a && "q" == g && h == e;
    }}));
    return !0 === e.q;
  } catch (d) {
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
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[e] = d.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, e) {
  var d = $jscomp.propertyToPolyfillSymbol[e];
  if (null == d) {
    return a[e];
  }
  d = a[d];
  return void 0 !== d ? d : a[e];
};
$jscomp.polyfill = function(a, e, d, g) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, e, d, g) : $jscomp.polyfillUnisolated(a, e, d, g));
};
$jscomp.polyfillUnisolated = function(a, e, d, g) {
  d = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var h = a[g];
    if (!(h in d)) {
      return;
    }
    d = d[h];
  }
  a = a[a.length - 1];
  g = d[a];
  e = e(g);
  e != g && null != e && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(a, e, d, g) {
  var h = a.split(".");
  a = 1 === h.length;
  g = h[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < h.length - 1; l++) {
    var m = h[l];
    if (!(m in g)) {
      return;
    }
    g = g[m];
  }
  h = h[h.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? g[h] : null;
  e = e(d);
  null != e && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:e}) : e !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && (d = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + d + "$" + h), h = $jscomp.propertyToPolyfillSymbol[h], $jscomp.defineProperty(g, h, {configurable:!0, writable:!0, value:e})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var e = function(l, m) {
    this.$jscomp$symbol$id_ = l;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  e.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", g = 0, h = function(l) {
    if (this instanceof h) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new e(d + (l || "") + "_" + g++, l);
  };
  return h;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var e = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < e.length; d++) {
    var g = $jscomp.global[e[d]];
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
  function d() {
  }
  function g(b) {
    var f = typeof b;
    return "object" === f && null !== b || "function" === f;
  }
  function h(b) {
    if (!$jscomp.owns(b, m)) {
      var f = new d;
      $jscomp.defineProperty(b, m, {value:f});
    }
  }
  function l(b) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var f = Object[b];
      f && (Object[b] = function(k) {
        if (k instanceof d) {
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
    if (e()) {
      return a;
    }
  }
  var m = "$jscomp_hidden_" + Math.random();
  l("freeze");
  l("preventExtensions");
  l("seal");
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
    if (!$jscomp.owns(b, m)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[m][this.id_] = f;
    return this;
  };
  c.prototype.get = function(b) {
    return g(b) && $jscomp.owns(b, m) ? b[m][this.id_] : void 0;
  };
  c.prototype.has = function(b) {
    return g(b) && $jscomp.owns(b, m) && $jscomp.owns(b[m], this.id_);
  };
  c.prototype.delete = function(b) {
    return g(b) && $jscomp.owns(b, m) && $jscomp.owns(b[m], this.id_) ? delete b[m][this.id_] : !1;
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
    if (e()) {
      return a;
    }
  }
  var d = new WeakMap, g = function(c) {
    this.data_ = {};
    this.head_ = m();
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
    this.head_ = this.head_.previous = m();
    this.size = 0;
  };
  g.prototype.has = function(c) {
    return !!h(this, c).entry;
  };
  g.prototype.get = function(c) {
    return (c = h(this, c).entry) && c.value;
  };
  g.prototype.entries = function() {
    return l(this, function(c) {
      return [c.key, c.value];
    });
  };
  g.prototype.keys = function() {
    return l(this, function(c) {
      return c.key;
    });
  };
  g.prototype.values = function() {
    return l(this, function(c) {
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
    "object" == f || "function" == f ? d.has(b) ? f = d.get(b) : (f = "" + ++p, d.set(b, f)) : f = "p_" + b;
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
  }, l = function(c, b) {
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
  }, m = function() {
    var c = {};
    return c.previous = c.next = c.head = c;
  }, p = 0;
  return g;
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(e, d) {
    return e === d ? 0 !== e || 1 / e === 1 / d : e !== e && d !== d;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(a) {
  return a ? a : function(e, d) {
    var g = this;
    g instanceof String && (g = String(g));
    var h = g.length;
    d = d || 0;
    for (0 > d && (d = Math.max(d + h, 0)); d < h; d++) {
      var l = g[d];
      if (l === e || Object.is(l, e)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function(a, e, d) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");
  }
  if (e instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.includes", function(a) {
  return a ? a : function(e, d) {
    return -1 !== $jscomp.checkStringArgs(this, e, "includes").indexOf(e, d || 0);
  };
}, "es6", "es3");
module.exports = function() {
  return (new Map([[1, 2], [2, NaN]])).includes(2) && (new Map([[1, 2], [2, NaN]])).includes(NaN);
};

