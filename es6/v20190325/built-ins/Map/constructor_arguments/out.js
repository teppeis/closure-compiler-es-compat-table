var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(e, d, h) {
      return e == a && "q" == d && h == c;
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
      var h = a[d];
      h in e || (e[h] = {});
      e = e[h];
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
      var b = Object.seal({}), k = Object.seal({}), f = new a([[b, 2], [k, 3]]);
      if (2 != f.get(b) || 3 != f.get(k)) {
        return !1;
      }
      f.delete(b);
      f.set(k, 4);
      return !f.has(b) && 4 == f.get(k);
    } catch (n) {
      return !1;
    }
  }
  function e() {
  }
  function d(b) {
    if (!$jscomp.owns(b, g)) {
      var a = new e;
      $jscomp.defineProperty(b, g, {value:a});
    }
  }
  function h(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof e) {
        return b;
      }
      d(b);
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
  var g = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var m = 0, l = function(b) {
    this.id_ = (m += Math.random() + 1).toString();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  l.prototype.set = function(b, a) {
    d(b);
    if (!$jscomp.owns(b, g)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[g][this.id_] = a;
    return this;
  };
  l.prototype.get = function(b) {
    return $jscomp.owns(b, g) ? b[g][this.id_] : void 0;
  };
  l.prototype.has = function(b) {
    return $jscomp.owns(b, g) && $jscomp.owns(b[g], this.id_);
  };
  l.prototype.delete = function(b) {
    return $jscomp.owns(b, g) && $jscomp.owns(b[g], this.id_) ? delete b[g][this.id_] : !1;
  };
  return l;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), k = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != k.get(b) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var f = k.entries(), c = f.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = f.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !f.next().done ? !1 : !0;
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
    this.head_ = m();
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
    var f = h(this, b);
    f.list || (f.list = this.data_[f.id] = []);
    f.entry ? f.entry.value = a : (f.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, f.list.push(f.entry), this.head_.previous.next = f.entry, this.head_.previous = f.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(b) {
    b = h(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = m();
    this.size = 0;
  };
  d.prototype.has = function(b) {
    return !!h(this, b).entry;
  };
  d.prototype.get = function(b) {
    return (b = h(this, b).entry) && b.value;
  };
  d.prototype.entries = function() {
    return g(this, function(b) {
      return [b.key, b.value];
    });
  };
  d.prototype.keys = function() {
    return g(this, function(b) {
      return b.key;
    });
  };
  d.prototype.values = function() {
    return g(this, function(b) {
      return b.value;
    });
  };
  d.prototype.forEach = function(b, a) {
    for (var f = this.entries(), c; !(c = f.next()).done;) {
      c = c.value, b.call(a, c[1], c[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var h = function(b, a) {
    var c = a && typeof a;
    "object" == c || "function" == c ? e.has(a) ? c = e.get(a) : (c = "" + ++l, e.set(a, c)) : c = "p_" + a;
    var d = b.data_[c];
    if (d && $jscomp.owns(b.data_, c)) {
      for (b = 0; b < d.length; b++) {
        var g = d[b];
        if (a !== a && g.key !== g.key || a === g.key) {
          return {id:c, list:d, index:b, entry:g};
        }
      }
    }
    return {id:c, list:d, index:-1, entry:void 0};
  }, g = function(a, c) {
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
  }, m = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = {}, c = {}, e = new Map([[a, 123], [c, 456]]);
  return e.has(a) && 123 === e.get(a) && e.has(c) && 456 === e.get(c);
};

