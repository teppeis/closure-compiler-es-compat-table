var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var b = {}, d = Object.create(new $jscomp.global.Proxy(b, {get:function(f, c, k) {
      return f == b && "q" == c && k == d;
    }}));
    return !0 === d.q;
  } catch (f) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(b) {
  var d = 0;
  return function() {
    return d < b.length ? {done:!1, value:b[d++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, f) {
  b != Array.prototype && b != Object.prototype && (b[d] = f.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(b, d) {
  this.$jscomp$symbol$id_ = b;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:d});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function b(f) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (f || "") + "_" + d++, f);
  }
  var d = 0;
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
  var d = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return d ? d.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.owns = function(b, d) {
  return Object.prototype.hasOwnProperty.call(b, d);
};
$jscomp.polyfill = function(b, d, f, c) {
  if (d) {
    f = $jscomp.global;
    b = b.split(".");
    for (c = 0; c < b.length - 1; c++) {
      var k = b[c];
      k in f || (f[k] = {});
      f = f[k];
    }
    b = b[b.length - 1];
    c = f[b];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(b) {
  function d() {
    if (!b || !Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({}), a = Object.seal({}), m = new b([[e, 2], [a, 3]]);
      if (2 != m.get(e) || 3 != m.get(a)) {
        return !1;
      }
      m.delete(e);
      m.set(a, 4);
      return !m.has(e) && 4 == m.get(a);
    } catch (p) {
      return !1;
    }
  }
  function f() {
  }
  function c(a) {
    var e = typeof a;
    return "object" === e && null !== a || "function" === e;
  }
  function k(a) {
    if (!$jscomp.owns(a, h)) {
      var e = new f;
      $jscomp.defineProperty(a, h, {value:e});
    }
  }
  function l(a) {
    var e = Object[a];
    e && (Object[a] = function(a) {
      if (a instanceof f) {
        return a;
      }
      k(a);
      return e(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (b && $jscomp.ES6_CONFORMANCE) {
      return b;
    }
  } else {
    if (d()) {
      return b;
    }
  }
  var h = "$jscomp_hidden_" + Math.random();
  l("freeze");
  l("preventExtensions");
  l("seal");
  var n = 0, a = function(a) {
    this.id_ = (n += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  a.prototype.set = function(a, b) {
    if (!c(a)) {
      throw Error("Invalid WeakMap key");
    }
    k(a);
    if (!$jscomp.owns(a, h)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[h][this.id_] = b;
    return this;
  };
  a.prototype.get = function(a) {
    return c(a) && $jscomp.owns(a, h) ? a[h][this.id_] : void 0;
  };
  a.prototype.has = function(a) {
    return c(a) && $jscomp.owns(a, h) && $jscomp.owns(a[h], this.id_);
  };
  a.prototype.delete = function(a) {
    return c(a) && $jscomp.owns(a, h) && $jscomp.owns(a[h], this.id_) ? delete a[h][this.id_] : !1;
  };
  return a;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(b) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var a = Object.seal({x:4}), e = new b($jscomp.makeIterator([[a, "s"]]));
      if ("s" != e.get(a) || 1 != e.size || e.get({x:4}) || e.set({x:4}, "t") != e || 2 != e.size) {
        return !1;
      }
      var g = e.entries(), c = g.next();
      if (c.done || c.value[0] != a || "s" != c.value[1]) {
        return !1;
      }
      c = g.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !g.next().done ? !1 : !0;
    } catch (p) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (b && $jscomp.ES6_CONFORMANCE) {
      return b;
    }
  } else {
    if (d()) {
      return b;
    }
  }
  $jscomp.initSymbolIterator();
  var f = new WeakMap, c = function(a) {
    this.data_ = {};
    this.head_ = h();
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
    var g = k(this, a);
    g.list || (g.list = this.data_[g.id] = []);
    g.entry ? g.entry.value = b : (g.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, g.list.push(g.entry), this.head_.previous.next = g.entry, this.head_.previous = g.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = k(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!k(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = k(this, a).entry) && a.value;
  };
  c.prototype.entries = function() {
    return l(this, function(a) {
      return [a.key, a.value];
    });
  };
  c.prototype.keys = function() {
    return l(this, function(a) {
      return a.key;
    });
  };
  c.prototype.values = function() {
    return l(this, function(a) {
      return a.value;
    });
  };
  c.prototype.forEach = function(a, b) {
    for (var g = this.entries(), c; !(c = g.next()).done;) {
      c = c.value, a.call(b, c[1], c[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var k = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? f.has(b) ? c = f.get(b) : (c = "" + ++n, f.set(b, c)) : c = "p_" + b;
    var d = a.data_[c];
    if (d && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < d.length; a++) {
        var e = d[a];
        if (b !== b && e.key !== e.key || b === e.key) {
          return {id:c, list:d, index:a, entry:e};
        }
      }
    }
    return {id:c, list:d, index:-1, entry:void 0};
  }, l = function(a, b) {
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
  }, h = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, n = 0;
  return c;
}, "es6", "es3");
module.exports = function() {
  return 1 === (new Map([[1, 2], [2, NaN]])).keyOf(2) && void 0 === (new Map([[1, 2], [2, NaN]])).keyOf(NaN);
};

