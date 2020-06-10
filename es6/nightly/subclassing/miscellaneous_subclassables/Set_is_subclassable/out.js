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
  for (var b, d = []; !(b = a.next()).done;) {
    d.push(b.value);
  }
  return d;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
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
  var d = $jscomp.propertyToPolyfillSymbol[b];
  if (null == d) {
    return a[b];
  }
  d = a[d];
  return void 0 !== d ? d : a[b];
};
$jscomp.polyfill = function(a, b, d, c) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, c) : $jscomp.polyfillUnisolated(a, b, d, c));
};
$jscomp.polyfillUnisolated = function(a, b, d, c) {
  d = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var e = a[c];
    e in d || (d[e] = {});
    d = d[e];
  }
  a = a[a.length - 1];
  c = d[a];
  b = b(c);
  b != c && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, c) {
  var e = a.split(".");
  a = 1 === e.length;
  c = e[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < e.length - 1; g++) {
    var f = e[g];
    f in c || (c[f] = {});
    c = c[f];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? c[e] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== d && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(c, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function a() {
    }
    new a;
    Reflect.construct(a, [], function() {
    });
    return new a instanceof a;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var b = Reflect.construct;
    return function(a, c, e) {
      a = b(a, c);
      e && Reflect.setPrototypeOf(a, e.prototype);
      return a;
    };
  }
  return function(a, c, b) {
    void 0 === b && (b = a);
    b = $jscomp.objectCreate(b.prototype || Object.prototype);
    return Function.prototype.apply.call(a, b, c) || b;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (d) {
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
    var d = $jscomp.setPrototypeOf;
    d(a, b);
  } else {
    for (d in b) {
      if ("prototype" != d) {
        if (Object.defineProperties) {
          var c = Object.getOwnPropertyDescriptor(b, d);
          c && Object.defineProperty(a, d, c);
        } else {
          a[d] = b[d];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
};
$jscomp.polyfill("Reflect.construct", function(a) {
  return $jscomp.construct;
}, "es6", "es3");
$jscomp.polyfill("Reflect.setPrototypeOf", function(a) {
  if (a) {
    return a;
  }
  if ($jscomp.setPrototypeOf) {
    var b = $jscomp.setPrototypeOf;
    return function(a, c) {
      try {
        return b(a, c), !0;
      } catch (e) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(d, c, e) {
      return d == a && "q" == c && e == b;
    }}));
    return !0 === b.q;
  } catch (d) {
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
  var b = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = 0, c = function(a) {
    if (this instanceof c) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (a || "") + "_" + d++, a);
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
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
    var c = $jscomp.global[b[d]];
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
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), c = Object.seal({}), d = new a([[b, 2], [c, 3]]);
      if (2 != d.get(b) || 3 != d.get(c)) {
        return !1;
      }
      d.delete(b);
      d.set(c, 4);
      return !d.has(b) && 4 == d.get(c);
    } catch (l) {
      return !1;
    }
  }
  function d() {
  }
  function c(a) {
    var b = typeof a;
    return "object" === b && null !== a || "function" === b;
  }
  function e(a) {
    if (!$jscomp.owns(a, f)) {
      var b = new d;
      $jscomp.defineProperty(a, f, {value:b});
    }
  }
  function g(a) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var b = Object[a];
      b && (Object[a] = function(a) {
        if (a instanceof d) {
          return a;
        }
        Object.isExtensible(a) && e(a);
        return b(a);
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
  var f = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var k = 0, h = function(a) {
    this.id_ = (k += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  h.prototype.set = function(a, b) {
    if (!c(a)) {
      throw Error("Invalid WeakMap key");
    }
    e(a);
    if (!$jscomp.owns(a, f)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[f][this.id_] = b;
    return this;
  };
  h.prototype.get = function(a) {
    return c(a) && $jscomp.owns(a, f) ? a[f][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return c(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_);
  };
  h.prototype.delete = function(a) {
    return c(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_) ? delete a[f][this.id_] : !1;
  };
  return h;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var d = c.entries(), e = d.next();
      if (e.done || e.value[0] != b || "s" != e.value[1]) {
        return !1;
      }
      e = d.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0;
    } catch (l) {
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
  var d = new WeakMap, c = function(a) {
    this.data_ = {};
    this.head_ = f();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  c.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var c = e(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b, }, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = e(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!e(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = e(this, a).entry) && a.value;
  };
  c.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  c.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  c.prototype.values = function() {
    return g(this, function(a) {
      return a.value;
    });
  };
  c.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var e = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? d.has(b) ? c = d.get(b) : (c = "" + ++k, d.set(b, c)) : c = "p_" + b;
    var e = a.data_[c];
    if (e && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:c, list:e, index:a, entry:f};
        }
      }
    }
    return {id:c, list:e, index:-1, entry:void 0};
  }, g = function(a, b) {
    var c = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (c) {
        for (; c.head != a.head_;) {
          c = c.previous;
        }
        for (; c.next != c.head;) {
          return c = c.next, {done:!1, value:b(c)};
        }
        c = null;
      }
      return {done:!0, value:void 0};
    });
  }, f = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, k = 0;
  return c;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), d = new a($jscomp.makeIterator([b]));
      if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var g = d.entries(), f = g.next();
      if (f.done || f.value[0] != b || f.value[1] != b) {
        return !1;
      }
      f = g.next();
      return f.done || f.value[0] == b || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : g.next().done;
    } catch (k) {
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
  var d = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
    this.size = this.map_.size;
  };
  d.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  d.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  d.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  d.prototype.has = function(a) {
    return this.map_.has(a);
  };
  d.prototype.entries = function() {
    return this.map_.entries();
  };
  d.prototype.values = function() {
    return this.map_.values();
  };
  d.prototype.keys = d.prototype.values;
  d.prototype[Symbol.iterator] = d.prototype.values;
  d.prototype.forEach = function(a, b) {
    var c = this;
    this.map_.forEach(function(d) {
      return a.call(b, d, d, c);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = function() {
    return $jscomp.construct(Set, arguments, this.constructor);
  };
  $jscomp.inherits(a, Set);
  var b = new a;
  b.add(123);
  b.add(123);
  return b instanceof a && b.has(123);
};

