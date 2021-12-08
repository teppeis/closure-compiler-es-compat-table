var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++],} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function(a) {
  for (var c, b = []; !(c = a.next()).done;) {
    b.push(c.value);
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
  var c = function() {
  };
  c.prototype = a;
  return new c();
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = b.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var c = 0; c < a.length; ++c) {
    var b = a[c];
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
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var b = $jscomp.propertyToPolyfillSymbol[c];
  if (null == b) {
    return a[c];
  }
  b = a[b];
  return void 0 !== b ? b : a[c];
};
$jscomp.polyfill = function(a, c, b, g) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, g) : $jscomp.polyfillUnisolated(a, c, b, g));
};
$jscomp.polyfillUnisolated = function(a, c, b, g) {
  b = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var h = a[g];
    if (!(h in b)) {
      return;
    }
    b = b[h];
  }
  a = a[a.length - 1];
  g = b[a];
  c = c(g);
  c != g && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, b, g) {
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
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? g[h] : null;
  c = c(b);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:c}) : c !== b && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && (b = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + b + "$" + h), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:c})));
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
    var c = Reflect.construct;
    return function(b, g, h) {
      b = c(b, g);
      h && Reflect.setPrototypeOf(b, h.prototype);
      return b;
    };
  }
  return function(b, g, h) {
    void 0 === h && (h = b);
    h = $jscomp.objectCreate(h.prototype || Object.prototype);
    return Function.prototype.apply.call(b, h, g) || h;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, c = {};
  try {
    return c.__proto__ = a, c.a;
  } catch (b) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, c) {
  a.__proto__ = c;
  if (a.__proto__ !== c) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, c) {
  a.prototype = $jscomp.objectCreate(c.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var b = $jscomp.setPrototypeOf;
    b(a, c);
  } else {
    for (b in c) {
      if ("prototype" != b) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(c, b);
          g && Object.defineProperty(a, b, g);
        } else {
          a[b] = c[b];
        }
      }
    }
  }
  a.superClass_ = c.prototype;
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
    var c = $jscomp.setPrototypeOf;
    return function(b, g) {
      try {
        return c(b, g), !0;
      } catch (h) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(b, g, h) {
      return b == a && "q" == g && h == c;
    }}));
    return !0 === c.q;
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
  var c = function(m, l) {
    this.$jscomp$symbol$id_ = m;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:l});
  };
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var b = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", g = 0, h = function(m) {
    if (this instanceof h) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(b + (m || "") + "_" + g++, m);
  };
  return h;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
    var g = $jscomp.global[c[b]];
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
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
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
  function b() {
  }
  function g(d) {
    var f = typeof d;
    return "object" === f && null !== d || "function" === f;
  }
  function h(d) {
    if (!$jscomp.owns(d, l)) {
      var f = new b();
      $jscomp.defineProperty(d, l, {value:f});
    }
  }
  function m(d) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var f = Object[d];
      f && (Object[d] = function(k) {
        if (k instanceof b) {
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
    if (c()) {
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
  function c() {
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
    if (c()) {
      return a;
    }
  }
  var b = new WeakMap(), g = function(e) {
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
    f.entry ? f.entry.value = d : (f.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:e, value:d,}, f.list.push(f.entry), this.head_.previous.next = f.entry, this.head_.previous = f.entry, this.size++);
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
    "object" == f || "function" == f ? b.has(d) ? f = b.get(d) : (f = "" + ++p, b.set(d, f)) : f = "p_" + d;
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
  var a = {}, c = function() {
    return $jscomp.construct(Map, arguments, this.constructor);
  };
  $jscomp.inherits(c, Map);
  var b = new c();
  b.set(a, 123);
  return b instanceof c && b.has(a) && 123 === b.get(a);
};

