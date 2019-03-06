var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(d, c, f) {
      return d == a && "q" == c && f == e;
    }}));
    return !0 === e.q;
  } catch (d) {
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, d) {
  a != Array.prototype && a != Object.prototype && (a[e] = d.value);
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
  function a(d) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (d || "") + "_" + e++, d);
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
$jscomp.polyfill = function(a, e, d, c) {
  if (e) {
    d = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var f = a[c];
      f in d || (d[f] = {});
      d = d[f];
    }
    a = a[a.length - 1];
    c = d[a];
    e = e(c);
    e != c && null != e && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function e() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), c = Object.seal({}), k = new a([[b, 2], [c, 3]]);
      if (2 != k.get(b) || 3 != k.get(c)) {
        return !1;
      }
      k.delete(b);
      k.set(c, 4);
      return !k.has(b) && 4 == k.get(c);
    } catch (m) {
      return !1;
    }
  }
  function d() {
  }
  function c(b) {
    if (!$jscomp.owns(b, g)) {
      var a = new d;
      $jscomp.defineProperty(b, g, {value:a});
    }
  }
  function f(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof d) {
        return b;
      }
      c(b);
      return a(b);
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
  f("freeze");
  f("preventExtensions");
  f("seal");
  var h = 0, l = function(b) {
    this.id_ = (h += Math.random() + 1).toString();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  l.prototype.set = function(b, a) {
    c(b);
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
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var k = c.entries(), d = k.next();
      if (d.done || d.value[0] != b || "s" != d.value[1]) {
        return !1;
      }
      d = k.next();
      return d.done || 4 != d.value[0].x || "t" != d.value[1] || !k.next().done ? !1 : !0;
    } catch (n) {
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
  var d = new WeakMap, c = function(b) {
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
  c.prototype.set = function(b, a) {
    b = 0 === b ? 0 : b;
    var c = f(this, b);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = a : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(b) {
    b = f(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  c.prototype.has = function(b) {
    return !!f(this, b).entry;
  };
  c.prototype.get = function(b) {
    return (b = f(this, b).entry) && b.value;
  };
  c.prototype.entries = function() {
    return g(this, function(b) {
      return [b.key, b.value];
    });
  };
  c.prototype.keys = function() {
    return g(this, function(b) {
      return b.key;
    });
  };
  c.prototype.values = function() {
    return g(this, function(b) {
      return b.value;
    });
  };
  c.prototype.forEach = function(b, a) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, b.call(a, d[1], d[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var f = function(a, c) {
    var b = c && typeof c;
    "object" == b || "function" == b ? d.has(c) ? b = d.get(c) : (b = "" + ++l, d.set(c, b)) : b = "p_" + c;
    var f = a.data_[b];
    if (f && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < f.length; a++) {
        var e = f[a];
        if (c !== c && e.key !== e.key || c === e.key) {
          return {id:b, list:f, index:a, entry:e};
        }
      }
    }
    return {id:b, list:f, index:-1, entry:void 0};
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
  }, h = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return c;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), d = new a($jscomp.makeIterator([c]));
      if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), h = e.next();
      if (h.done || h.value[0] != c || h.value[1] != c) {
        return !1;
      }
      h = e.next();
      return h.done || h.value[0] == c || 4 != h.value[0].x || h.value[1] != h.value[0] ? !1 : e.next().done;
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
  var d = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        this.add(c.value);
      }
    }
    this.size = this.map_.size;
  };
  d.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  d.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  d.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  d.prototype.has = function(a) {
    return this.map_.has(a);
  };
  d.prototype.entries = function() {
    return this.map_.entries();
  };
  d.prototype.values = function() {
    return this.map_.values();
  };
  d.prototype.keys = d.prototype.values;
  d.prototype[Symbol.iterator] = d.prototype.values;
  d.prototype.forEach = function(a, d) {
    var c = this;
    this.map_.forEach(function(e) {
      return a.call(d, e, e, c);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  return (new Set([1, 2, 3])).isDisjointFrom([4, 5, 6]);
};

