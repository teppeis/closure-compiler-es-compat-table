var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var d = 0; d < a.length; ++d) {
    var b = a[d];
    if (b && b.Math == Math) {
      return b;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, d) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:d});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(b) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (b || "") + "_" + d++, b);
  }
  var d = 0;
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
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(b, c, e) {
      return b == a && "q" == c && e == d;
    }}));
    return !0 === d.q;
  } catch (b) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = $jscomp.ISOLATE_POLYFILLS && "function" === typeof Symbol && "symbol" === typeof Symbol("x");
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
    var e = a[c];
    e in b || (b[e] = {});
    b = b[e];
  }
  a = a[a.length - 1];
  c = b[a];
  d = d(c);
  d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, b, c) {
  var e = a.split(".");
  a = 1 === e.length;
  c = e[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < e.length - 1; h++) {
    var f = e[h];
    f in c || (c[f] = {});
    c = c[f];
  }
  e = e[e.length - 1];
  b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? c[e] : null;
  d = d(b);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:d}) : d !== b && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(c, e, {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), c = Object.seal({}), g = new a([[k, 2], [c, 3]]);
      if (2 != g.get(k) || 3 != g.get(c)) {
        return !1;
      }
      g.delete(k);
      g.set(c, 4);
      return !g.has(k) && 4 == g.get(c);
    } catch (m) {
      return !1;
    }
  }
  function b() {
  }
  function c(a) {
    var c = typeof a;
    return "object" === c && null !== a || "function" === c;
  }
  function e(a) {
    if (!$jscomp.owns(a, f)) {
      var c = new b;
      $jscomp.defineProperty(a, f, {value:c});
    }
  }
  function h(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      if (a instanceof b) {
        return a;
      }
      e(a);
      return c(a);
    });
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
  var f = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var l = 0, g = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  g.prototype.set = function(a, g) {
    if (!c(a)) {
      throw Error("Invalid WeakMap key");
    }
    e(a);
    if (!$jscomp.owns(a, f)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[f][this.id_] = g;
    return this;
  };
  g.prototype.get = function(a) {
    return c(a) && $jscomp.owns(a, f) ? a[f][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return c(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_);
  };
  g.prototype.delete = function(a) {
    return c(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_) ? delete a[f][this.id_] : !1;
  };
  return g;
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
      var d = b.entries(), e = d.next();
      if (e.done || e.value[0] != c || "s" != e.value[1]) {
        return !1;
      }
      e = d.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0;
    } catch (m) {
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
  $jscomp.initSymbolIterator();
  var b = new WeakMap, c = function(a) {
    this.data_ = {};
    this.head_ = f();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  c.prototype.set = function(a, c) {
    a = 0 === a ? 0 : a;
    var b = e(this, a);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = c : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
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
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  c.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  c.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  c.prototype.forEach = function(a, c) {
    for (var b = this.entries(), d; !(d = b.next()).done;) {
      d = d.value, a.call(c, d[1], d[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var e = function(a, c) {
    var d = c && typeof c;
    "object" == d || "function" == d ? b.has(c) ? d = b.get(c) : (d = "" + ++l, b.set(c, d)) : d = "p_" + c;
    var e = a.data_[d];
    if (e && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (c !== c && f.key !== f.key || c === f.key) {
          return {id:d, list:e, index:a, entry:f};
        }
      }
    }
    return {id:d, list:e, index:-1, entry:void 0};
  }, h = function(a, c) {
    var b = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (b) {
        for (; b.head != a.head_;) {
          b = b.previous;
        }
        for (; b.next != b.head;) {
          return b = b.next, {done:!1, value:c(b)};
        }
        b = null;
      }
      return {done:!0, value:void 0};
    });
  }, f = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return c;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([c]));
      if (!b.has(c) || 1 != b.size || b.add(c) != b || 1 != b.size || b.add({x:4}) != b || 2 != b.size) {
        return !1;
      }
      var d = b.entries(), f = d.next();
      if (f.done || f.value[0] != c || f.value[1] != c) {
        return !1;
      }
      f = d.next();
      return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : d.next().done;
    } catch (l) {
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
  $jscomp.initSymbolIterator();
  var b = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        this.add(c.value);
      }
    }
    this.size = this.map_.size;
  };
  b.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  b.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  b.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  b.prototype.has = function(a) {
    return this.map_.has(a);
  };
  b.prototype.entries = function() {
    return this.map_.entries();
  };
  b.prototype.values = function() {
    return this.map_.values();
  };
  b.prototype.keys = b.prototype.values;
  b.prototype[Symbol.iterator] = b.prototype.values;
  b.prototype.forEach = function(a, b) {
    var c = this;
    this.map_.forEach(function(d) {
      return a.call(b, d, d, c);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  module.exports._ = Symbol.iterator;
  var a = !1, d = global.__createIterableObject([1, 2, 3], {"return":function() {
    a = !0;
    return {};
  }}), b = Set.prototype.add;
  Set.prototype.add = function() {
    throw 0;
  };
  try {
    new Set(d);
  } catch (c) {
  }
  Set.prototype.add = b;
  return a;
};

