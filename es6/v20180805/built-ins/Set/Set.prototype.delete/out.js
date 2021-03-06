var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(f, c, b) {
      return f == a && "q" == c && b == d;
    }}));
    return !0 === d.q;
  } catch (f) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, f) {
  a != Array.prototype && a != Object.prototype && (a[d] = f.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
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
$jscomp.arrayIterator = function(a) {
  var d = 0;
  return $jscomp.iteratorPrototype(function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
  });
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
  $jscomp.initSymbolIterator();
  var d = a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill = function(a, d, f, c) {
  if (d) {
    f = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var b = a[c];
      b in f || (f[b] = {});
      f = f[b];
    }
    a = a[a.length - 1];
    c = f[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), e = Object.seal({}), h = new a([[c, 2], [e, 3]]);
      if (2 != h.get(c) || 3 != h.get(e)) {
        return !1;
      }
      h.delete(c);
      h.set(e, 4);
      return !h.has(c) && 4 == h.get(e);
    } catch (l) {
      return !1;
    }
  }
  function f(a) {
    $jscomp.owns(a, b) || $jscomp.defineProperty(a, b, {value:{}});
  }
  function c(a) {
    var e = Object[a];
    e && (Object[a] = function(a) {
      f(a);
      return e(a);
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
  var b = "$jscomp_hidden_" + Math.random();
  c("freeze");
  c("preventExtensions");
  c("seal");
  var k = 0, g = function(a) {
    this.id_ = (k += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var e; !(e = a.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  g.prototype.set = function(a, e) {
    f(a);
    if (!$jscomp.owns(a, b)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[b][this.id_] = e;
    return this;
  };
  g.prototype.get = function(a) {
    return $jscomp.owns(a, b) ? a[b][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return $jscomp.owns(a, b) && $jscomp.owns(a[b], this.id_);
  };
  g.prototype.delete = function(a) {
    return $jscomp.owns(a, b) && $jscomp.owns(a[b], this.id_) ? delete a[b][this.id_] : !1;
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
      var e = Object.seal({x:4}), c = new a($jscomp.makeIterator([[e, "s"]]));
      if ("s" != c.get(e) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var l = c.entries(), b = l.next();
      if (b.done || b.value[0] != e || "s" != b.value[1]) {
        return !1;
      }
      b = l.next();
      return b.done || 4 != b.value[0].x || "t" != b.value[1] || !l.next().done ? !1 : !0;
    } catch (n) {
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
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var f = new WeakMap, c = function(a) {
    this.data_ = {};
    this.head_ = g();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var e; !(e = a.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  c.prototype.set = function(a, c) {
    a = 0 === a ? 0 : a;
    var e = b(this, a);
    e.list || (e.list = this.data_[e.id] = []);
    e.entry ? e.entry.value = c : (e.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, e.list.push(e.entry), this.head_.previous.next = e.entry, this.head_.previous = e.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = b(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!b(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = b(this, a).entry) && a.value;
  };
  c.prototype.entries = function() {
    return k(this, function(a) {
      return [a.key, a.value];
    });
  };
  c.prototype.keys = function() {
    return k(this, function(a) {
      return a.key;
    });
  };
  c.prototype.values = function() {
    return k(this, function(a) {
      return a.value;
    });
  };
  c.prototype.forEach = function(a, c) {
    for (var e = this.entries(), b; !(b = e.next()).done;) {
      b = b.value, a.call(c, b[1], b[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var b = function(a, c) {
    var b = c && typeof c;
    "object" == b || "function" == b ? f.has(c) ? b = f.get(c) : (b = "" + ++m, f.set(c, b)) : b = "p_" + c;
    var e = a.data_[b];
    if (e && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < e.length; a++) {
        var d = e[a];
        if (c !== c && d.key !== d.key || c === d.key) {
          return {id:b, list:e, index:a, entry:d};
        }
      }
    }
    return {id:b, list:e, index:-1, entry:void 0};
  }, k = function(a, c) {
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
  }, g = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, m = 0;
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
      var f = b.entries(), d = f.next();
      if (d.done || d.value[0] != c || d.value[1] != c) {
        return !1;
      }
      d = f.next();
      return d.done || d.value[0] == c || 4 != d.value[0].x || d.value[1] != d.value[0] ? !1 : f.next().done;
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
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var f = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        this.add(c.value);
      }
    }
    this.size = this.map_.size;
  };
  f.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  f.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  f.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  f.prototype.has = function(a) {
    return this.map_.has(a);
  };
  f.prototype.entries = function() {
    return this.map_.entries();
  };
  f.prototype.values = function() {
    return this.map_.values();
  };
  f.prototype.keys = f.prototype.values;
  f.prototype[Symbol.iterator] = f.prototype.values;
  f.prototype.forEach = function(a, b) {
    var c = this;
    this.map_.forEach(function(d) {
      return a.call(b, d, d, c);
    });
  };
  return f;
}, "es6", "es3");
module.exports = function() {
  return "function" === typeof Set.prototype.delete;
};

