var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(e, c, h) {
      return e == a && "q" == c && h == d;
    }}));
    return !0 === d.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, e) {
  a != Array.prototype && a != Object.prototype && (a[d] = e.value);
};
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
  function a(e) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + d++, e);
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
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill = function(a, d, e, c) {
  if (d) {
    e = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var h = a[c];
      h in e || (e[h] = {});
      e = e[h];
    }
    a = a[a.length - 1];
    c = e[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({}), b = Object.seal({}), l = new a([[f, 2], [b, 3]]);
      if (2 != l.get(f) || 3 != l.get(b)) {
        return !1;
      }
      l.delete(f);
      l.set(b, 4);
      return !l.has(f) && 4 == l.get(b);
    } catch (p) {
      return !1;
    }
  }
  function e() {
  }
  function c(b) {
    var a = typeof b;
    return "object" === a && null !== b || "function" === a;
  }
  function h(b) {
    if (!$jscomp.owns(b, g)) {
      var a = new e;
      $jscomp.defineProperty(b, g, {value:a});
    }
  }
  function k(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof e) {
        return b;
      }
      h(b);
      return a(b);
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
  var g = "$jscomp_hidden_" + Math.random();
  k("freeze");
  k("preventExtensions");
  k("seal");
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
    if (!c(b)) {
      throw Error("Invalid WeakMap key");
    }
    h(b);
    if (!$jscomp.owns(b, g)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[g][this.id_] = a;
    return this;
  };
  b.prototype.get = function(b) {
    return c(b) && $jscomp.owns(b, g) ? b[g][this.id_] : void 0;
  };
  b.prototype.has = function(b) {
    return c(b) && $jscomp.owns(b, g) && $jscomp.owns(b[g], this.id_);
  };
  b.prototype.delete = function(b) {
    return c(b) && $jscomp.owns(b, g) && $jscomp.owns(b[g], this.id_) ? delete b[g][this.id_] : !1;
  };
  return b;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), f = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != f.get(b) || 1 != f.size || f.get({x:4}) || f.set({x:4}, "t") != f || 2 != f.size) {
        return !1;
      }
      var m = f.entries(), c = m.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = m.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !m.next().done ? !1 : !0;
    } catch (p) {
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
  var e = new WeakMap, c = function(b) {
    this.data_ = {};
    this.head_ = g();
    this.size = 0;
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  c.prototype.set = function(b, a) {
    b = 0 === b ? 0 : b;
    var c = h(this, b);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = a : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(b) {
    b = h(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  c.prototype.has = function(b) {
    return !!h(this, b).entry;
  };
  c.prototype.get = function(b) {
    return (b = h(this, b).entry) && b.value;
  };
  c.prototype.entries = function() {
    return k(this, function(b) {
      return [b.key, b.value];
    });
  };
  c.prototype.keys = function() {
    return k(this, function(b) {
      return b.key;
    });
  };
  c.prototype.values = function() {
    return k(this, function(b) {
      return b.value;
    });
  };
  c.prototype.forEach = function(b, a) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, b.call(a, d[1], d[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var h = function(b, a) {
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
  }, k = function(b, a) {
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
  }, g = function() {
    var b = {};
    return b.previous = b.next = b.head = b;
  }, n = 0;
  return c;
}, "es6", "es3");
module.exports = function() {
  var a = {}, d = {}, e = Map.from([[a, 1], [d, 2]], function(a) {
    return [a[0], a[1] + 1];
  });
  return 5 === e.get(a) + e.get(d);
};

