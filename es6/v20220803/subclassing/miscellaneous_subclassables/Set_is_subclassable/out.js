var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++],} : {done:!0};
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
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var d = function() {
  };
  d.prototype = a;
  return new d();
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
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
    var h = a[c];
    if (!(h in b)) {
      return;
    }
    b = b[h];
  }
  a = a[a.length - 1];
  c = b[a];
  d = d(c);
  d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, b, c) {
  var h = a.split(".");
  a = 1 === h.length;
  c = h[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < h.length - 1; m++) {
    var k = h[m];
    if (!(k in c)) {
      return;
    }
    c = c[k];
  }
  h = h[h.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? c[h] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:d}) : d !== b && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && (b = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + b + "$" + h), $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:d})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function b() {
    }
    new b();
    Reflect.construct(b, [], function() {
    });
    return new b() instanceof b;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var d = Reflect.construct;
    return function(b, c, h) {
      b = d(b, c);
      h && Reflect.setPrototypeOf(b, h.prototype);
      return b;
    };
  }
  return function(b, c, h) {
    void 0 === h && (h = b);
    h = $jscomp.objectCreate(h.prototype || Object.prototype);
    return Function.prototype.apply.call(b, h, c) || h;
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
      } catch (h) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(b, c, h) {
      return b == a && "q" == c && h == d;
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
  var d = function(m, k) {
    this.$jscomp$symbol$id_ = m;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:k});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var b = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", c = 0, h = function(m) {
    if (this instanceof h) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d(b + (m || "") + "_" + c++, m);
  };
  return h;
}, "es6", "es3");
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
      var e = Object.seal({}), g = Object.seal({}), l = new a([[e, 2], [g, 3]]);
      if (2 != l.get(e) || 3 != l.get(g)) {
        return !1;
      }
      l.delete(e);
      l.set(g, 4);
      return !l.has(e) && 4 == l.get(g);
    } catch (n) {
      return !1;
    }
  }
  function b() {
  }
  function c(e) {
    var g = typeof e;
    return "object" === g && null !== e || "function" === g;
  }
  function h(e) {
    if (!$jscomp.owns(e, k)) {
      var g = new b();
      $jscomp.defineProperty(e, k, {value:g});
    }
  }
  function m(e) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var g = Object[e];
      g && (Object[e] = function(l) {
        if (l instanceof b) {
          return l;
        }
        Object.isExtensible(l) && h(l);
        return g(l);
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
  var k = "$jscomp_hidden_" + Math.random();
  m("freeze");
  m("preventExtensions");
  m("seal");
  var p = 0, f = function(e) {
    this.id_ = (p += Math.random() + 1).toString();
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var g; !(g = e.next()).done;) {
        g = g.value, this.set(g[0], g[1]);
      }
    }
  };
  f.prototype.set = function(e, g) {
    if (!c(e)) {
      throw Error("Invalid WeakMap key");
    }
    h(e);
    if (!$jscomp.owns(e, k)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[k][this.id_] = g;
    return this;
  };
  f.prototype.get = function(e) {
    return c(e) && $jscomp.owns(e, k) ? e[k][this.id_] : void 0;
  };
  f.prototype.has = function(e) {
    return c(e) && $jscomp.owns(e, k) && $jscomp.owns(e[k], this.id_);
  };
  f.prototype.delete = function(e) {
    return c(e) && $jscomp.owns(e, k) && $jscomp.owns(e[k], this.id_) ? delete e[k][this.id_] : !1;
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
      var g = e.entries(), l = g.next();
      if (l.done || l.value[0] != f || "s" != l.value[1]) {
        return !1;
      }
      l = g.next();
      return l.done || 4 != l.value[0].x || "t" != l.value[1] || !g.next().done ? !1 : !0;
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
  var b = new WeakMap(), c = function(f) {
    this.data_ = {};
    this.head_ = k();
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
    var g = h(this, f);
    g.list || (g.list = this.data_[g.id] = []);
    g.entry ? g.entry.value = e : (g.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:f, value:e,}, g.list.push(g.entry), this.head_.previous.next = g.entry, this.head_.previous = g.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(f) {
    f = h(this, f);
    return f.entry && f.list ? (f.list.splice(f.index, 1), f.list.length || delete this.data_[f.id], f.entry.previous.next = f.entry.next, f.entry.next.previous = f.entry.previous, f.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = k();
    this.size = 0;
  };
  c.prototype.has = function(f) {
    return !!h(this, f).entry;
  };
  c.prototype.get = function(f) {
    return (f = h(this, f).entry) && f.value;
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
    for (var g = this.entries(), l; !(l = g.next()).done;) {
      l = l.value, f.call(e, l[1], l[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var h = function(f, e) {
    var g = e && typeof e;
    "object" == g || "function" == g ? b.has(e) ? g = b.get(e) : (g = "" + ++p, b.set(e, g)) : g = "p_" + e;
    var l = f.data_[g];
    if (l && $jscomp.owns(f.data_, g)) {
      for (f = 0; f < l.length; f++) {
        var n = l[f];
        if (e !== e && n.key !== n.key || e === n.key) {
          return {id:g, list:l, index:f, entry:n};
        }
      }
    }
    return {id:g, list:l, index:-1, entry:void 0};
  }, m = function(f, e) {
    var g = f.head_;
    return $jscomp.iteratorPrototype(function() {
      if (g) {
        for (; g.head != f.head_;) {
          g = g.previous;
        }
        for (; g.next != g.head;) {
          return g = g.next, {done:!1, value:e(g)};
        }
        g = null;
      }
      return {done:!0, value:void 0};
    });
  }, k = function() {
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
      var c = Object.seal({x:4}), h = new a($jscomp.makeIterator([c]));
      if (!h.has(c) || 1 != h.size || h.add(c) != h || 1 != h.size || h.add({x:4}) != h || 2 != h.size) {
        return !1;
      }
      var m = h.entries(), k = m.next();
      if (k.done || k.value[0] != c || k.value[1] != c) {
        return !1;
      }
      k = m.next();
      return k.done || k.value[0] == c || 4 != k.value[0].x || k.value[1] != k.value[0] ? !1 : m.next().done;
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
    this.map_ = new Map();
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var h; !(h = c.next()).done;) {
        this.add(h.value);
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
  b.prototype.forEach = function(c, h) {
    var m = this;
    this.map_.forEach(function(k) {
      return c.call(h, k, k, m);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = function() {
    return $jscomp.construct(Set, arguments, this.constructor);
  };
  $jscomp.inherits(a, Set);
  var d = new a();
  d.add(123);
  d.add(123);
  return d instanceof a && d.has(123);
};

