var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = e.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var e = a[c];
    if (e && e.Math == Math) {
      return e;
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
  var e = $jscomp.propertyToPolyfillSymbol[c];
  if (null == e) {
    return a[c];
  }
  e = a[e];
  return void 0 !== e ? e : a[c];
};
$jscomp.polyfill = function(a, c, e, b) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, e, b) : $jscomp.polyfillUnisolated(a, c, e, b));
};
$jscomp.polyfillUnisolated = function(a, c, e, b) {
  e = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var f = a[b];
    if (!(f in e)) {
      return;
    }
    e = e[f];
  }
  a = a[a.length - 1];
  b = e[a];
  c = c(b);
  c != b && null != c && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, e, b) {
  var f = a.split(".");
  a = 1 === f.length;
  b = f[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < f.length - 1; h++) {
    var g = f[h];
    if (!(g in b)) {
      return;
    }
    b = b[g];
  }
  f = f[f.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? b[f] : null;
  c = c(e);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:c}) : c !== e && ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f, f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(b, f, {configurable:!0, writable:!0, value:c})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var c = function(a, c) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
  };
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = 0, b = function(a) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c("jscomp_symbol_" + (a || "") + "_" + e++, a);
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
  for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < c.length; e++) {
    var b = $jscomp.global[c[e]];
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
$jscomp.polyfill("Object.fromEntries", function(a) {
  return a ? a : function(a) {
    var c = {};
    if (!(Symbol.iterator in a)) {
      throw new TypeError("" + a + " is not iterable");
    }
    a = a[Symbol.iterator].call(a);
    for (var b = a.next(); !b.done; b = a.next()) {
      b = b.value;
      if (Object(b) !== b) {
        throw new TypeError("iterable for fromEntries should yield objects");
      }
      c[b[0]] = b[1];
    }
    return c;
  };
}, "es_2019", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(e, b, f) {
      return e == a && "q" == b && f == c;
    }}));
    return !0 === c.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
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
      var k = Object.seal({}), d = Object.seal({}), b = new a([[k, 2], [d, 3]]);
      if (2 != b.get(k) || 3 != b.get(d)) {
        return !1;
      }
      b.delete(k);
      b.set(d, 4);
      return !b.has(k) && 4 == b.get(d);
    } catch (m) {
      return !1;
    }
  }
  function e() {
  }
  function b(a) {
    var d = typeof a;
    return "object" === d && null !== a || "function" === d;
  }
  function f(a) {
    if (!$jscomp.owns(a, g)) {
      var d = new e;
      $jscomp.defineProperty(a, g, {value:d});
    }
  }
  function h(a) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var d = Object[a];
      d && (Object[a] = function(a) {
        if (a instanceof e) {
          return a;
        }
        Object.isExtensible(a) && f(a);
        return d(a);
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
  var g = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var l = 0, d = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  d.prototype.set = function(a, d) {
    if (!b(a)) {
      throw Error("Invalid WeakMap key");
    }
    f(a);
    if (!$jscomp.owns(a, g)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[g][this.id_] = d;
    return this;
  };
  d.prototype.get = function(a) {
    return b(a) && $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  d.prototype.has = function(a) {
    return b(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  d.prototype.delete = function(a) {
    return b(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return d;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), b = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != b.get(d) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var c = b.entries(), e = c.next();
      if (e.done || e.value[0] != d || "s" != e.value[1]) {
        return !1;
      }
      e = c.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !c.next().done ? !1 : !0;
    } catch (m) {
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
  var e = new WeakMap, b = function(a) {
    this.data_ = {};
    this.head_ = g();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  b.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var d = f(this, a);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b, }, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(a) {
    a = f(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  b.prototype.has = function(a) {
    return !!f(this, a).entry;
  };
  b.prototype.get = function(a) {
    return (a = f(this, a).entry) && a.value;
  };
  b.prototype.entries = function() {
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  b.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  b.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  b.prototype.forEach = function(a, b) {
    for (var d = this.entries(), c; !(c = d.next()).done;) {
      c = c.value, a.call(b, c[1], c[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var f = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? e.has(b) ? c = e.get(b) : (c = "" + ++l, e.set(b, c)) : c = "p_" + b;
    var d = a.data_[c];
    if (d && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < d.length; a++) {
        var f = d[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:c, list:d, index:a, entry:f};
        }
      }
    }
    return {id:c, list:d, index:-1, entry:void 0};
  }, h = function(a, b) {
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
  }, g = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = Object.fromEntries(new Map([["foo", 42], ["bar", 23]]));
  return 42 === a.foo && 23 === a.bar;
};

