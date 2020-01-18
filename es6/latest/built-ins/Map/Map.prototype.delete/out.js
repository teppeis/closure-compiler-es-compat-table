var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, b];
  for (var c = 0; c < b.length; ++c) {
    var e = b[c];
    if (e && e.Math == Math) {
      return e;
    }
  }
  return globalThis;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var b = {}, c = Object.create(new $jscomp.global.Proxy(b, {get:function(e, d, h) {
      return e == b && "q" == d && h == c;
    }}));
    return !0 === c.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, e) {
  b != Array.prototype && b != Object.prototype && (b[c] = e.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(b, c) {
  this.$jscomp$symbol$id_ = b;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function b(e) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + c++, e);
  }
  var c = 0;
  return b;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.asyncIterator;
  b || (b = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {next:b};
  b[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return b;
};
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return c ? c.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.owns = function(b, c) {
  return Object.prototype.hasOwnProperty.call(b, c);
};
$jscomp.polyfill = function(b, c, e, d) {
  if (c) {
    e = $jscomp.global;
    b = b.split(".");
    for (d = 0; d < b.length - 1; d++) {
      var h = b[d];
      h in e || (e[h] = {});
      e = e[h];
    }
    b = b[b.length - 1];
    d = e[b];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(b) {
  function c() {
    if (!b || !Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({}), a = Object.seal({}), c = new b([[f, 2], [a, 3]]);
      if (2 != c.get(f) || 3 != c.get(a)) {
        return !1;
      }
      c.delete(f);
      c.set(a, 4);
      return !c.has(f) && 4 == c.get(a);
    } catch (m) {
      return !1;
    }
  }
  function e() {
  }
  function d(a) {
    var f = typeof a;
    return "object" === f && null !== a || "function" === f;
  }
  function h(a) {
    if (!$jscomp.owns(a, g)) {
      var f = new e;
      $jscomp.defineProperty(a, g, {value:f});
    }
  }
  function k(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof e) {
        return a;
      }
      h(a);
      return b(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (b && $jscomp.ES6_CONFORMANCE) {
      return b;
    }
  } else {
    if (c()) {
      return b;
    }
  }
  var g = "$jscomp_hidden_" + Math.random();
  k("freeze");
  k("preventExtensions");
  k("seal");
  var l = 0, a = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  a.prototype.set = function(a, b) {
    if (!d(a)) {
      throw Error("Invalid WeakMap key");
    }
    h(a);
    if (!$jscomp.owns(a, g)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[g][this.id_] = b;
    return this;
  };
  a.prototype.get = function(a) {
    return d(a) && $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  a.prototype.has = function(a) {
    return d(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  a.prototype.delete = function(a) {
    return d(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return a;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(b) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var a = Object.seal({x:4}), f = new b($jscomp.makeIterator([[a, "s"]]));
      if ("s" != f.get(a) || 1 != f.size || f.get({x:4}) || f.set({x:4}, "t") != f || 2 != f.size) {
        return !1;
      }
      var c = f.entries(), d = c.next();
      if (d.done || d.value[0] != a || "s" != d.value[1]) {
        return !1;
      }
      d = c.next();
      return d.done || 4 != d.value[0].x || "t" != d.value[1] || !c.next().done ? !1 : !0;
    } catch (m) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (b && $jscomp.ES6_CONFORMANCE) {
      return b;
    }
  } else {
    if (c()) {
      return b;
    }
  }
  $jscomp.initSymbolIterator();
  var e = new WeakMap, d = function(a) {
    this.data_ = {};
    this.head_ = g();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  d.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var c = h(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(a) {
    a = h(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  d.prototype.has = function(a) {
    return !!h(this, a).entry;
  };
  d.prototype.get = function(a) {
    return (a = h(this, a).entry) && a.value;
  };
  d.prototype.entries = function() {
    return k(this, function(a) {
      return [a.key, a.value];
    });
  };
  d.prototype.keys = function() {
    return k(this, function(a) {
      return a.key;
    });
  };
  d.prototype.values = function() {
    return k(this, function(a) {
      return a.value;
    });
  };
  d.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var h = function(a, b) {
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
  }, k = function(a, b) {
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
  return d;
}, "es6", "es3");
module.exports = function() {
  return "function" === typeof Map.prototype.delete;
};

