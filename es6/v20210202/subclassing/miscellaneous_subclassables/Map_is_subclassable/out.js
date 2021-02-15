var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
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
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
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
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) {
    return a[b];
  }
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function(a, b, c, g) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, g) : $jscomp.polyfillUnisolated(a, b, c, g));
};
$jscomp.polyfillUnisolated = function(a, b, c, g) {
  c = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var h = a[g];
    if (!(h in c)) {
      return;
    }
    c = c[h];
  }
  a = a[a.length - 1];
  g = c[a];
  b = b(g);
  b != g && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, c, g) {
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
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? g[h] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && ($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:b})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function c() {
    }
    new c;
    Reflect.construct(c, [], function() {
    });
    return new c instanceof c;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var b = Reflect.construct;
    return function(c, g, h) {
      c = b(c, g);
      h && Reflect.setPrototypeOf(c, h.prototype);
      return c;
    };
  }
  return function(c, g, h) {
    void 0 === h && (h = c);
    h = $jscomp.objectCreate(h.prototype || Object.prototype);
    return Function.prototype.apply.call(c, h, g) || h;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (c) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
  a.__proto__ = b;
  if (a.__proto__ !== b) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, b) {
  a.prototype = $jscomp.objectCreate(b.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    c(a, b);
  } else {
    for (c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(b, c);
          g && Object.defineProperty(a, c, g);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
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
    var b = $jscomp.setPrototypeOf;
    return function(c, g) {
      try {
        return b(c, g), !0;
      } catch (h) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(c, g, h) {
      return c == a && "q" == g && h == b;
    }}));
    return !0 === b.q;
  } catch (c) {
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
  var b = function(h, m) {
    this.$jscomp$symbol$id_ = h;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:m});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var c = 0, g = function(h) {
    if (this instanceof g) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (h || "") + "_" + c++, h);
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var g = $jscomp.global[b[c]];
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
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), f = Object.seal({}), k = new a([[d, 2], [f, 3]]);
      if (2 != k.get(d) || 3 != k.get(f)) {
        return !1;
      }
      k.delete(d);
      k.set(f, 4);
      return !k.has(d) && 4 == k.get(f);
    } catch (n) {
      return !1;
    }
  }
  function c() {
  }
  function g(d) {
    var f = typeof d;
    return "object" === f && null !== d || "function" === f;
  }
  function h(d) {
    if (!$jscomp.owns(d, l)) {
      var f = new c;
      $jscomp.defineProperty(d, l, {value:f});
    }
  }
  function m(d) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var f = Object[d];
      f && (Object[d] = function(k) {
        if (k instanceof c) {
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
    if (b()) {
      return a;
    }
  }
  var l = "$jscomp_hidden_" + Math.random();
  m("freeze");
  m("preventExtensions");
  m("seal");
  var p = 0, e = function(d) {
    this.id_ = (p += Math.random() + 1).toString();
    if (d) {
      d = $jscomp.makeIterator(d);
      for (var f; !(f = d.next()).done;) {
        f = f.value, this.set(f[0], f[1]);
      }
    }
  };
  e.prototype.set = function(d, f) {
    if (!g(d)) {
      throw Error("Invalid WeakMap key");
    }
    h(d);
    if (!$jscomp.owns(d, l)) {
      throw Error("WeakMap key fail: " + d);
    }
    d[l][this.id_] = f;
    return this;
  };
  e.prototype.get = function(d) {
    return g(d) && $jscomp.owns(d, l) ? d[l][this.id_] : void 0;
  };
  e.prototype.has = function(d) {
    return g(d) && $jscomp.owns(d, l) && $jscomp.owns(d[l], this.id_);
  };
  e.prototype.delete = function(d) {
    return g(d) && $jscomp.owns(d, l) && $jscomp.owns(d[l], this.id_) ? delete d[l][this.id_] : !1;
  };
  return e;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({x:4}), d = new a($jscomp.makeIterator([[e, "s"]]));
      if ("s" != d.get(e) || 1 != d.size || d.get({x:4}) || d.set({x:4}, "t") != d || 2 != d.size) {
        return !1;
      }
      var f = d.entries(), k = f.next();
      if (k.done || k.value[0] != e || "s" != k.value[1]) {
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
    if (b()) {
      return a;
    }
  }
  var c = new WeakMap, g = function(e) {
    this.data_ = {};
    this.head_ = l();
    this.size = 0;
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var d; !(d = e.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  g.prototype.set = function(e, d) {
    e = 0 === e ? 0 : e;
    var f = h(this, e);
    f.list || (f.list = this.data_[f.id] = []);
    f.entry ? f.entry.value = d : (f.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:e, value:d, }, f.list.push(f.entry), this.head_.previous.next = f.entry, this.head_.previous = f.entry, this.size++);
    return this;
  };
  g.prototype.delete = function(e) {
    e = h(this, e);
    return e.entry && e.list ? (e.list.splice(e.index, 1), e.list.length || delete this.data_[e.id], e.entry.previous.next = e.entry.next, e.entry.next.previous = e.entry.previous, e.entry.head = null, this.size--, !0) : !1;
  };
  g.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = l();
    this.size = 0;
  };
  g.prototype.has = function(e) {
    return !!h(this, e).entry;
  };
  g.prototype.get = function(e) {
    return (e = h(this, e).entry) && e.value;
  };
  g.prototype.entries = function() {
    return m(this, function(e) {
      return [e.key, e.value];
    });
  };
  g.prototype.keys = function() {
    return m(this, function(e) {
      return e.key;
    });
  };
  g.prototype.values = function() {
    return m(this, function(e) {
      return e.value;
    });
  };
  g.prototype.forEach = function(e, d) {
    for (var f = this.entries(), k; !(k = f.next()).done;) {
      k = k.value, e.call(d, k[1], k[0], this);
    }
  };
  g.prototype[Symbol.iterator] = g.prototype.entries;
  var h = function(e, d) {
    var f = d && typeof d;
    "object" == f || "function" == f ? c.has(d) ? f = c.get(d) : (f = "" + ++p, c.set(d, f)) : f = "p_" + d;
    var k = e.data_[f];
    if (k && $jscomp.owns(e.data_, f)) {
      for (e = 0; e < k.length; e++) {
        var n = k[e];
        if (d !== d && n.key !== n.key || d === n.key) {
          return {id:f, list:k, index:e, entry:n};
        }
      }
    }
    return {id:f, list:k, index:-1, entry:void 0};
  }, m = function(e, d) {
    var f = e.head_;
    return $jscomp.iteratorPrototype(function() {
      if (f) {
        for (; f.head != e.head_;) {
          f = f.previous;
        }
        for (; f.next != f.head;) {
          return f = f.next, {done:!1, value:d(f)};
        }
        f = null;
      }
      return {done:!0, value:void 0};
    });
  }, l = function() {
    var e = {};
    return e.previous = e.next = e.head = e;
  }, p = 0;
  return g;
}, "es6", "es3");
module.exports = function() {
  var a = {}, b = function() {
    return $jscomp.construct(Map, arguments, this.constructor);
  };
  $jscomp.inherits(b, Map);
  var c = new b;
  c.set(a, 123);
  return c instanceof b && c.has(a) && 123 === c.get(a);
};

