var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var e = a[b];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(e, c, f) {
      return e == a && "q" == c && f == b;
    }}));
    return !0 === b.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, e) {
  a != Array.prototype && a != Object.prototype && (a[b] = e.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(e) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + b++, e);
  }
  var b = 0;
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
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var e = $jscomp.propertyToPolyfillSymbol[b];
  if (null == e) {
    return a[b];
  }
  e = a[e];
  return void 0 !== e ? e : a[b];
};
$jscomp.polyfill = function(a, b, e, c) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, e, c) : $jscomp.polyfillUnisolated(a, b, e, c));
};
$jscomp.polyfillUnisolated = function(a, b, e, c) {
  e = $jscomp.global;
  a = a.split(".");
  for (c = 0; c < a.length - 1; c++) {
    var f = a[c];
    f in e || (e[f] = {});
    e = e[f];
  }
  a = a[a.length - 1];
  c = e[a];
  b = b(c);
  b != c && null != b && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, e, c) {
  var f = a.split(".");
  a = 1 === f.length;
  c = f[0];
  c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < f.length - 1; h++) {
    var g = f[h];
    g in c || (c[g] = {});
    c = c[g];
  }
  f = f[f.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? c[f] : null;
  b = b(e);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:b}) : b !== e && ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f, f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(c, f, {configurable:!0, writable:!0, value:b})));
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
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
  function c(a) {
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
    var d = Object[a];
    d && (Object[a] = function(a) {
      if (a instanceof e) {
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
    if (b()) {
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
    if (!c(a)) {
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
    return c(a) && $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  d.prototype.has = function(a) {
    return c(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  d.prototype.delete = function(a) {
    return c(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return d;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), b = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != b.get(d) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var e = b.entries(), c = e.next();
      if (c.done || c.value[0] != d || "s" != c.value[1]) {
        return !1;
      }
      c = e.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !e.next().done ? !1 : !0;
    } catch (m) {
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
  $jscomp.initSymbolIterator();
  var e = new WeakMap, c = function(a) {
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
  c.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var d = f(this, a);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = f(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!f(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = f(this, a).entry) && a.value;
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
  c.prototype.forEach = function(a, b) {
    for (var d = this.entries(), c; !(c = d.next()).done;) {
      c = c.value, a.call(b, c[1], c[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
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
  return c;
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, e, c) {
    e = null != e ? e : function(a) {
      return a;
    };
    var b = [], h = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof h) {
      a = h.call(a);
      for (var g = 0; !(h = a.next()).done;) {
        b.push(e.call(c, h.value, g++));
      }
    } else {
      for (h = a.length, g = 0; g < h; g++) {
        b.push(e.call(c, a[g], g));
      }
    }
    return b;
  };
}, "es6", "es3");
module.exports = function() {
  var a = new Map([["a", 1]]);
  return 2 !== a.upsert("a", function(a) {
    return 2;
  }, function() {
    return 3;
  }) || 3 !== a.upsert("b", function(a) {
    return 2;
  }, function() {
    return 3;
  }) ? !1 : "a,2,b,3" === Array.from(a).join();
};

