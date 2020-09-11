var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function(a) {
  for (var d, b = []; !(d = a.next()).done;) {
    b.push(d.value);
  }
  return b;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.ENABLE_UNHANDLED_REJECTION_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var d = function() {
  };
  d.prototype = a;
  return new d;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var d = 0; d < a.length; ++d) {
    var b = a[d];
    if (b && b.Math == Math) {
      return b;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var b = $jscomp.propertyToPolyfillSymbol[d];
  if (null == b) {
    return a[d];
  }
  b = a[b];
  return void 0 !== b ? b : a[d];
};
$jscomp.polyfill = function(a, d, b, c) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, b, c) : $jscomp.polyfillUnisolated(a, d, b, c));
};
$jscomp.polyfillUnisolated = function(a, d, b, c) {
  b = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var g = a[c];
    if (!(g in b)) {
      return;
    }
    b = b[g];
  }
  a = a[a.length - 1];
  c = b[a];
  d = d(c);
  d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, b, c) {
  var g = a.split(".");
  a = 1 === g.length;
  c = g[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < g.length - 1; m++) {
    var l = g[m];
    if (!(l in c)) {
      return;
    }
    c = c[l];
  }
  g = g[g.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? c[g] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, g, {configurable:!0, writable:!0, value:d}) : d !== b && ($jscomp.propertyToPolyfillSymbol[g] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(g) : $jscomp.POLYFILL_PREFIX + g, g = $jscomp.propertyToPolyfillSymbol[g], $jscomp.defineProperty(c, g, {configurable:!0, writable:!0, value:d})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function b() {
    }
    new b;
    Reflect.construct(b, [], function() {
    });
    return new b instanceof b;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var d = Reflect.construct;
    return function(b, c, g) {
      b = d(b, c);
      g && Reflect.setPrototypeOf(b, g.prototype);
      return b;
    };
  }
  return function(b, c, g) {
    void 0 === g && (g = b);
    g = $jscomp.objectCreate(g.prototype || Object.prototype);
    return Function.prototype.apply.call(b, g, c) || g;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, d = {};
  try {
    return d.__proto__ = a, d.a;
  } catch (b) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, d) {
  a.__proto__ = d;
  if (a.__proto__ !== d) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, d) {
  a.prototype = $jscomp.objectCreate(d.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var b = $jscomp.setPrototypeOf;
    b(a, d);
  } else {
    for (b in d) {
      if ("prototype" != b) {
        if (Object.defineProperties) {
          var c = Object.getOwnPropertyDescriptor(d, b);
          c && Object.defineProperty(a, b, c);
        } else {
          a[b] = d[b];
        }
      }
    }
  }
  a.superClass_ = d.prototype;
};
$jscomp.polyfill("Reflect", function(a) {
  return a ? a : {};
}, "es6", "es3");
$jscomp.polyfill("Reflect.construct", function(a) {
  return $jscomp.construct;
}, "es6", "es3");
$jscomp.polyfill("Reflect.setPrototypeOf", function(a) {
  if (a) {
    return a;
  }
  if ($jscomp.setPrototypeOf) {
    var d = $jscomp.setPrototypeOf;
    return function(b, c) {
      try {
        return d(b, c), !0;
      } catch (g) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(b, c, g) {
      return b == a && "q" == c && g == d;
    }}));
    return !0 === d.q;
  } catch (b) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var d = function(g, m) {
    this.$jscomp$symbol$id_ = g;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var b = 0, c = function(g) {
    if (this instanceof c) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d("jscomp_symbol_" + (g || "") + "_" + b++, g);
  };
  return c;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var d = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < d.length; b++) {
    var c = $jscomp.global[d[b]];
    "function" === typeof c && "function" != typeof c.prototype[a] && $jscomp.defineProperty(c.prototype, a, {configurable:!0, writable:!0, value:function() {
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
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({}), h = Object.seal({}), k = new a([[e, 2], [h, 3]]);
      if (2 != k.get(e) || 3 != k.get(h)) {
        return !1;
      }
      k.delete(e);
      k.set(h, 4);
      return !k.has(e) && 4 == k.get(h);
    } catch (n) {
      return !1;
    }
  }
  function b() {
  }
  function c(e) {
    var h = typeof e;
    return "object" === h && null !== e || "function" === h;
  }
  function g(e) {
    if (!$jscomp.owns(e, l)) {
      var h = new b;
      $jscomp.defineProperty(e, l, {value:h});
    }
  }
  function m(e) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var h = Object[e];
      h && (Object[e] = function(k) {
        if (k instanceof b) {
          return k;
        }
        Object.isExtensible(k) && g(k);
        return h(k);
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
  var p = 0, f = function(e) {
    this.id_ = (p += Math.random() + 1).toString();
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var h; !(h = e.next()).done;) {
        h = h.value, this.set(h[0], h[1]);
      }
    }
  };
  f.prototype.set = function(e, h) {
    if (!c(e)) {
      throw Error("Invalid WeakMap key");
    }
    g(e);
    if (!$jscomp.owns(e, l)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[l][this.id_] = h;
    return this;
  };
  f.prototype.get = function(e) {
    return c(e) && $jscomp.owns(e, l) ? e[l][this.id_] : void 0;
  };
  f.prototype.has = function(e) {
    return c(e) && $jscomp.owns(e, l) && $jscomp.owns(e[l], this.id_);
  };
  f.prototype.delete = function(e) {
    return c(e) && $jscomp.owns(e, l) && $jscomp.owns(e[l], this.id_) ? delete e[l][this.id_] : !1;
  };
  return f;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({x:4}), e = new a($jscomp.makeIterator([[f, "s"]]));
      if ("s" != e.get(f) || 1 != e.size || e.get({x:4}) || e.set({x:4}, "t") != e || 2 != e.size) {
        return !1;
      }
      var h = e.entries(), k = h.next();
      if (k.done || k.value[0] != f || "s" != k.value[1]) {
        return !1;
      }
      k = h.next();
      return k.done || 4 != k.value[0].x || "t" != k.value[1] || !h.next().done ? !1 : !0;
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
  var b = new WeakMap, c = function(f) {
    this.data_ = {};
    this.head_ = l();
    this.size = 0;
    if (f) {
      f = $jscomp.makeIterator(f);
      for (var e; !(e = f.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  c.prototype.set = function(f, e) {
    f = 0 === f ? 0 : f;
    var h = g(this, f);
    h.list || (h.list = this.data_[h.id] = []);
    h.entry ? h.entry.value = e : (h.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:f, value:e, }, h.list.push(h.entry), this.head_.previous.next = h.entry, this.head_.previous = h.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(f) {
    f = g(this, f);
    return f.entry && f.list ? (f.list.splice(f.index, 1), f.list.length || delete this.data_[f.id], f.entry.previous.next = f.entry.next, f.entry.next.previous = f.entry.previous, f.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = l();
    this.size = 0;
  };
  c.prototype.has = function(f) {
    return !!g(this, f).entry;
  };
  c.prototype.get = function(f) {
    return (f = g(this, f).entry) && f.value;
  };
  c.prototype.entries = function() {
    return m(this, function(f) {
      return [f.key, f.value];
    });
  };
  c.prototype.keys = function() {
    return m(this, function(f) {
      return f.key;
    });
  };
  c.prototype.values = function() {
    return m(this, function(f) {
      return f.value;
    });
  };
  c.prototype.forEach = function(f, e) {
    for (var h = this.entries(), k; !(k = h.next()).done;) {
      k = k.value, f.call(e, k[1], k[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var g = function(f, e) {
    var h = e && typeof e;
    "object" == h || "function" == h ? b.has(e) ? h = b.get(e) : (h = "" + ++p, b.set(e, h)) : h = "p_" + e;
    var k = f.data_[h];
    if (k && $jscomp.owns(f.data_, h)) {
      for (f = 0; f < k.length; f++) {
        var n = k[f];
        if (e !== e && n.key !== n.key || e === n.key) {
          return {id:h, list:k, index:f, entry:n};
        }
      }
    }
    return {id:h, list:k, index:-1, entry:void 0};
  }, m = function(f, e) {
    var h = f.head_;
    return $jscomp.iteratorPrototype(function() {
      if (h) {
        for (; h.head != f.head_;) {
          h = h.previous;
        }
        for (; h.next != h.head;) {
          return h = h.next, {done:!1, value:e(h)};
        }
        h = null;
      }
      return {done:!0, value:void 0};
    });
  }, l = function() {
    var f = {};
    return f.previous = f.next = f.head = f;
  }, p = 0;
  return c;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), g = new a($jscomp.makeIterator([c]));
      if (!g.has(c) || 1 != g.size || g.add(c) != g || 1 != g.size || g.add({x:4}) != g || 2 != g.size) {
        return !1;
      }
      var m = g.entries(), l = m.next();
      if (l.done || l.value[0] != c || l.value[1] != c) {
        return !1;
      }
      l = m.next();
      return l.done || l.value[0] == c || 4 != l.value[0].x || l.value[1] != l.value[0] ? !1 : m.next().done;
    } catch (p) {
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
  var b = function(c) {
    this.map_ = new Map;
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var g; !(g = c.next()).done;) {
        this.add(g.value);
      }
    }
    this.size = this.map_.size;
  };
  b.prototype.add = function(c) {
    c = 0 === c ? 0 : c;
    this.map_.set(c, c);
    this.size = this.map_.size;
    return this;
  };
  b.prototype.delete = function(c) {
    c = this.map_.delete(c);
    this.size = this.map_.size;
    return c;
  };
  b.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  b.prototype.has = function(c) {
    return this.map_.has(c);
  };
  b.prototype.entries = function() {
    return this.map_.entries();
  };
  b.prototype.values = function() {
    return this.map_.values();
  };
  b.prototype.keys = b.prototype.values;
  b.prototype[Symbol.iterator] = b.prototype.values;
  b.prototype.forEach = function(c, g) {
    var m = this;
    this.map_.forEach(function(l) {
      return c.call(g, l, l, m);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = function() {
    return $jscomp.construct(Set, arguments, this.constructor);
  };
  $jscomp.inherits(a, Set);
  var d = new a;
  d.add(123);
  d.add(123);
  return d instanceof a && d.has(123);
};

