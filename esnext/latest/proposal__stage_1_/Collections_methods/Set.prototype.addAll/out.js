var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(d, b, f) {
      return d == a && "q" == b && f == e;
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
$jscomp.Symbol = function() {
  var a = 0;
  return function(e) {
    return $jscomp.SYMBOL_PREFIX + (e || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
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
$jscomp.polyfill = function(a, e, d, b) {
  if (e) {
    d = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var f = a[b];
      f in d || (d[f] = {});
      d = d[f];
    }
    a = a[a.length - 1];
    b = d[a];
    e = e(b);
    e != b && null != e && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function e() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), b = Object.seal({}), k = new a([[c, 2], [b, 3]]);
      if (2 != k.get(c) || 3 != k.get(b)) {
        return !1;
      }
      k.delete(c);
      k.set(b, 4);
      return !k.has(c) && 4 == k.get(b);
    } catch (m) {
      return !1;
    }
  }
  function d() {
  }
  function b(c) {
    if (!$jscomp.owns(c, g)) {
      var a = new d;
      $jscomp.defineProperty(c, g, {value:a});
    }
  }
  function f(c) {
    var a = Object[c];
    a && (Object[c] = function(c) {
      if (c instanceof d) {
        return c;
      }
      b(c);
      return a(c);
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
  var h = 0, l = function(c) {
    this.id_ = (h += Math.random() + 1).toString();
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var a; !(a = c.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  l.prototype.set = function(c, a) {
    b(c);
    if (!$jscomp.owns(c, g)) {
      throw Error("WeakMap key fail: " + c);
    }
    c[g][this.id_] = a;
    return this;
  };
  l.prototype.get = function(c) {
    return $jscomp.owns(c, g) ? c[g][this.id_] : void 0;
  };
  l.prototype.has = function(c) {
    return $jscomp.owns(c, g) && $jscomp.owns(c[g], this.id_);
  };
  l.prototype.delete = function(c) {
    return $jscomp.owns(c, g) && $jscomp.owns(c[g], this.id_) ? delete c[g][this.id_] : !1;
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
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != b.get(c) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var k = b.entries(), d = k.next();
      if (d.done || d.value[0] != c || "s" != d.value[1]) {
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
  var d = new WeakMap, b = function(c) {
    this.data_ = {};
    this.head_ = h();
    this.size = 0;
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var a; !(a = c.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  b.prototype.set = function(c, a) {
    c = 0 === c ? 0 : c;
    var b = f(this, c);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = a : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:c, value:a}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(a) {
    a = f(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  b.prototype.has = function(a) {
    return !!f(this, a).entry;
  };
  b.prototype.get = function(a) {
    return (a = f(this, a).entry) && a.value;
  };
  b.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  b.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  b.prototype.values = function() {
    return g(this, function(a) {
      return a.value;
    });
  };
  b.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var f = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? d.has(b) ? c = d.get(b) : (c = "" + ++l, d.set(b, c)) : c = "p_" + b;
    var f = a.data_[c];
    if (f && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < f.length; a++) {
        var e = f[a];
        if (b !== b && e.key !== e.key || b === e.key) {
          return {id:c, list:f, index:a, entry:e};
        }
      }
    }
    return {id:c, list:f, index:-1, entry:void 0};
  }, g = function(a, b) {
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
  }, l = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), d = new a($jscomp.makeIterator([b]));
      if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), h = e.next();
      if (h.done || h.value[0] != b || h.value[1] != b) {
        return !1;
      }
      h = e.next();
      return h.done || h.value[0] == b || 4 != h.value[0].x || h.value[1] != h.value[0] ? !1 : e.next().done;
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
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
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
    var b = this;
    this.map_.forEach(function(e) {
      return a.call(d, e, e, b);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = (new Set([1, 2])).addAll(2, 3);
  return 3 === a.size && a.has(1) && a.has(2) && a.has(3);
};

