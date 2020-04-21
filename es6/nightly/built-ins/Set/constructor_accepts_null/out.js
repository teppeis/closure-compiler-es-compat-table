var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var e = 0; e < a.length; ++e) {
    var c = a[e];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(c, b, f) {
      return c == a && "q" == b && f == e;
    }}));
    return !0 === e.q;
  } catch (c) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var e = 0;
  return function() {
    return e < a.length ? {done:!1, value:a[e++]} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, c) {
  a != Array.prototype && a != Object.prototype && (a[e] = c.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, e) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:e});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(c) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + e++, c);
  }
  var e = 0;
  return a;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
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
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = $jscomp.ISOLATE_POLYFILLS && "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, e) {
  var c = $jscomp.propertyToPolyfillSymbol[e];
  if (null == c) {
    return a[e];
  }
  c = a[c];
  return void 0 !== c ? c : a[e];
};
$jscomp.polyfill = function(a, e, c, b) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, e, c, b) : $jscomp.polyfillUnisolated(a, e, c, b));
};
$jscomp.polyfillUnisolated = function(a, e, c, b) {
  c = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var f = a[b];
    f in c || (c[f] = {});
    c = c[f];
  }
  a = a[a.length - 1];
  b = c[a];
  e = e(b);
  e != b && null != e && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(a, e, c, b) {
  var f = a.split(".");
  a = 1 === f.length;
  b = f[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < f.length - 1; h++) {
    var g = f[h];
    g in b || (b[g] = {});
    b = b[g];
  }
  f = f[f.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? b[f] : null;
  e = e(c);
  null != e && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:e}) : e !== c && ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f, f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(b, f, {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("WeakMap", function(a) {
  function e() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), b = Object.seal({}), d = new a([[k, 2], [b, 3]]);
      if (2 != d.get(k) || 3 != d.get(b)) {
        return !1;
      }
      d.delete(k);
      d.set(b, 4);
      return !d.has(k) && 4 == d.get(b);
    } catch (m) {
      return !1;
    }
  }
  function c() {
  }
  function b(a) {
    var d = typeof a;
    return "object" === d && null !== a || "function" === d;
  }
  function f(a) {
    if (!$jscomp.owns(a, g)) {
      var d = new c;
      $jscomp.defineProperty(a, g, {value:d});
    }
  }
  function h(a) {
    var d = Object[a];
    d && (Object[a] = function(a) {
      if (a instanceof c) {
        return a;
      }
      f(a);
      return d(a);
    });
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
  function e() {
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
    if (e()) {
      return a;
    }
  }
  $jscomp.initSymbolIterator();
  var c = new WeakMap, b = function(a) {
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
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
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
    var d = b && typeof b;
    "object" == d || "function" == d ? c.has(b) ? d = c.get(b) : (d = "" + ++l, c.set(b, d)) : d = "p_" + b;
    var e = a.data_[d];
    if (e && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:d, list:e, index:a, entry:f};
        }
      }
    }
    return {id:d, list:e, index:-1, entry:void 0};
  }, h = function(a, b) {
    var d = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != a.head_;) {
          d = d.previous;
        }
        for (; d.next != d.head;) {
          return d = d.next, {done:!1, value:b(d)};
        }
        d = null;
      }
      return {done:!0, value:void 0};
    });
  }, g = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([b]));
      if (!c.has(b) || 1 != c.size || c.add(b) != c || 1 != c.size || c.add({x:4}) != c || 2 != c.size) {
        return !1;
      }
      var e = c.entries(), g = e.next();
      if (g.done || g.value[0] != b || g.value[1] != b) {
        return !1;
      }
      g = e.next();
      return g.done || g.value[0] == b || 4 != g.value[0].x || g.value[1] != g.value[0] ? !1 : e.next().done;
    } catch (l) {
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
  $jscomp.initSymbolIterator();
  var c = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
    this.size = this.map_.size;
  };
  c.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  c.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  c.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return this.map_.has(a);
  };
  c.prototype.entries = function() {
    return this.map_.entries();
  };
  c.prototype.values = function() {
    return this.map_.values();
  };
  c.prototype.keys = c.prototype.values;
  c.prototype[Symbol.iterator] = c.prototype.values;
  c.prototype.forEach = function(a, c) {
    var b = this;
    this.map_.forEach(function(e) {
      return a.call(c, e, e, b);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  new Set(null);
  return !0;
};

