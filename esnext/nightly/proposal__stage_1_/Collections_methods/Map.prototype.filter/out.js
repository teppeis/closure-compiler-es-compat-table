var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(e, d, k) {
      return e == a && "q" == d && k == c;
    }}));
    return !0 === c.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
  a != Array.prototype && a != Object.prototype && (a[c] = e.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, c) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(e) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + c++, e);
  }
  var c = 0;
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
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill = function(a, c, e, d) {
  if (c) {
    e = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var k = a[d];
      k in e || (e[k] = {});
      e = e[k];
    }
    a = a[a.length - 1];
    d = e[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({}), b = Object.seal({}), m = new a([[f, 2], [b, 3]]);
      if (2 != m.get(f) || 3 != m.get(b)) {
        return !1;
      }
      m.delete(f);
      m.set(b, 4);
      return !m.has(f) && 4 == m.get(b);
    } catch (p) {
      return !1;
    }
  }
  function e() {
  }
  function d(b) {
    var a = typeof b;
    return "object" === a && null !== b || "function" === a;
  }
  function k(b) {
    if (!$jscomp.owns(b, h)) {
      var a = new e;
      $jscomp.defineProperty(b, h, {value:a});
    }
  }
  function l(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof e) {
        return b;
      }
      k(b);
      return a(b);
    });
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
  var h = "$jscomp_hidden_" + Math.random();
  l("freeze");
  l("preventExtensions");
  l("seal");
  var n = 0, b = function(b) {
    this.id_ = (n += Math.random() + 1).toString();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  b.prototype.set = function(b, a) {
    if (!d(b)) {
      throw Error("Invalid WeakMap key");
    }
    k(b);
    if (!$jscomp.owns(b, h)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[h][this.id_] = a;
    return this;
  };
  b.prototype.get = function(b) {
    return d(b) && $jscomp.owns(b, h) ? b[h][this.id_] : void 0;
  };
  b.prototype.has = function(b) {
    return d(b) && $jscomp.owns(b, h) && $jscomp.owns(b[h], this.id_);
  };
  b.prototype.delete = function(b) {
    return d(b) && $jscomp.owns(b, h) && $jscomp.owns(b[h], this.id_) ? delete b[h][this.id_] : !1;
  };
  return b;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), f = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != f.get(b) || 1 != f.size || f.get({x:4}) || f.set({x:4}, "t") != f || 2 != f.size) {
        return !1;
      }
      var g = f.entries(), c = g.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = g.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !g.next().done ? !1 : !0;
    } catch (p) {
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
  $jscomp.initSymbolIterator();
  var e = new WeakMap, d = function(b) {
    this.data_ = {};
    this.head_ = h();
    this.size = 0;
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  d.prototype.set = function(b, a) {
    b = 0 === b ? 0 : b;
    var g = k(this, b);
    g.list || (g.list = this.data_[g.id] = []);
    g.entry ? g.entry.value = a : (g.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, g.list.push(g.entry), this.head_.previous.next = g.entry, this.head_.previous = g.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(b) {
    b = k(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  d.prototype.has = function(b) {
    return !!k(this, b).entry;
  };
  d.prototype.get = function(b) {
    return (b = k(this, b).entry) && b.value;
  };
  d.prototype.entries = function() {
    return l(this, function(b) {
      return [b.key, b.value];
    });
  };
  d.prototype.keys = function() {
    return l(this, function(b) {
      return b.key;
    });
  };
  d.prototype.values = function() {
    return l(this, function(b) {
      return b.value;
    });
  };
  d.prototype.forEach = function(b, a) {
    for (var g = this.entries(), c; !(c = g.next()).done;) {
      c = c.value, b.call(a, c[1], c[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var k = function(b, a) {
    var c = a && typeof a;
    "object" == c || "function" == c ? e.has(a) ? c = e.get(a) : (c = "" + ++n, e.set(a, c)) : c = "p_" + a;
    var d = b.data_[c];
    if (d && $jscomp.owns(b.data_, c)) {
      for (b = 0; b < d.length; b++) {
        var f = d[b];
        if (a !== a && f.key !== f.key || a === f.key) {
          return {id:c, list:d, index:b, entry:f};
        }
      }
    }
    return {id:c, list:d, index:-1, entry:void 0};
  }, l = function(b, a) {
    var c = b.head_;
    return $jscomp.iteratorPrototype(function() {
      if (c) {
        for (; c.head != b.head_;) {
          c = c.previous;
        }
        for (; c.next != c.head;) {
          return c = c.next, {done:!1, value:a(c)};
        }
        c = null;
      }
      return {done:!0, value:void 0};
    });
  }, h = function() {
    var b = {};
    return b.previous = b.next = b.head = b;
  }, n = 0;
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = (new Map([[1, 4], [2, 5], [3, 6]])).filter(function(a) {
    return !(a % 2);
  });
  return 2 === a.size && 4 === a.get(1) && 6 === a.get(3);
};

