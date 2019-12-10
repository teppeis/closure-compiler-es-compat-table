var $jscomp = $jscomp || {};
$jscomp.scope = {};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, f) {
  b != Array.prototype && b != Object.prototype && (b[c] = f.value);
};
$jscomp.getGlobal = function(b) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
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
  function b(f) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (f || "") + "_" + c++, f);
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
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var b = {}, c = Object.create(new $jscomp.global.Proxy(b, {get:function(f, e, h) {
      return f == b && "q" == e && h == c;
    }}));
    return !0 === c.q;
  } catch (f) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return c ? c.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.owns = function(b, c) {
  return Object.prototype.hasOwnProperty.call(b, c);
};
$jscomp.polyfill = function(b, c, f, e) {
  if (c) {
    f = $jscomp.global;
    b = b.split(".");
    for (e = 0; e < b.length - 1; e++) {
      var h = b[e];
      h in f || (f[h] = {});
      f = f[h];
    }
    b = b[b.length - 1];
    e = f[b];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(b) {
  function c() {
    if (!b || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), a = Object.seal({}), l = new b([[d, 2], [a, 3]]);
      if (2 != l.get(d) || 3 != l.get(a)) {
        return !1;
      }
      l.delete(d);
      l.set(a, 4);
      return !l.has(d) && 4 == l.get(a);
    } catch (p) {
      return !1;
    }
  }
  function f() {
  }
  function e(a) {
    var d = typeof a;
    return "object" === d && null !== a || "function" === d;
  }
  function h(a) {
    if (!$jscomp.owns(a, g)) {
      var d = new f;
      $jscomp.defineProperty(a, g, {value:d});
    }
  }
  function k(a) {
    var d = Object[a];
    d && (Object[a] = function(a) {
      if (a instanceof f) {
        return a;
      }
      h(a);
      return d(a);
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
  var n = 0, a = function(a) {
    this.id_ = (n += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  a.prototype.set = function(a, b) {
    if (!e(a)) {
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
    return e(a) && $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  a.prototype.has = function(a) {
    return e(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  a.prototype.delete = function(a) {
    return e(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
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
      var a = Object.seal({x:4}), d = new b($jscomp.makeIterator([[a, "s"]]));
      if ("s" != d.get(a) || 1 != d.size || d.get({x:4}) || d.set({x:4}, "t") != d || 2 != d.size) {
        return !1;
      }
      var m = d.entries(), c = m.next();
      if (c.done || c.value[0] != a || "s" != c.value[1]) {
        return !1;
      }
      c = m.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !m.next().done ? !1 : !0;
    } catch (p) {
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
  var f = new WeakMap, e = function(a) {
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
  e.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var d = h(this, a);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    a = h(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!h(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = h(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return k(this, function(a) {
      return [a.key, a.value];
    });
  };
  e.prototype.keys = function() {
    return k(this, function(a) {
      return a.key;
    });
  };
  e.prototype.values = function() {
    return k(this, function(a) {
      return a.value;
    });
  };
  e.prototype.forEach = function(a, b) {
    for (var d = this.entries(), c; !(c = d.next()).done;) {
      c = c.value, a.call(b, c[1], c[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var h = function(a, b) {
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
  }, n = 0;
  return e;
}, "es6", "es3");
module.exports = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  return "function" === typeof Map.prototype[Symbol.iterator];
};

