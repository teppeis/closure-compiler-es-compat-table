var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, f = Object.create(new $jscomp.global.Proxy(a, {get:function(d, c, b) {
      return d == a && "q" == c && b == f;
    }}));
    return !0 === f.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, f, d) {
  a != Array.prototype && a != Object.prototype && (a[f] = d.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(f) {
    return $jscomp.SYMBOL_PREFIX + (f || "") + a++;
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
$jscomp.arrayIterator = function(a) {
  var f = 0;
  return $jscomp.iteratorPrototype(function() {
    return f < a.length ? {done:!1, value:a[f++]} : {done:!0};
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
  var f = a[Symbol.iterator];
  return f ? f.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, f) {
  return Object.prototype.hasOwnProperty.call(a, f);
};
$jscomp.polyfill = function(a, f, d, c) {
  if (f) {
    d = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var b = a[c];
      b in d || (d[b] = {});
      d = d[b];
    }
    a = a[a.length - 1];
    c = d[a];
    f = f(c);
    f != c && null != f && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:f});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function f() {
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
  function d(a) {
    $jscomp.owns(a, b) || $jscomp.defineProperty(a, b, {value:{}});
  }
  function c(a) {
    var e = Object[a];
    e && (Object[a] = function(a) {
      d(a);
      return e(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (f()) {
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
    d(a);
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
  function f() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || !a.prototype.entries || "function" != typeof Object.seal) {
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
    if (f()) {
      return a;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = new WeakMap, c = function(a) {
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
    "object" == b || "function" == b ? d.has(c) ? b = d.get(c) : (b = "" + ++m, d.set(c, b)) : b = "p_" + c;
    var e = a.data_[b];
    if (e && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (c !== c && f.key !== f.key || c === f.key) {
          return {id:b, list:e, index:a, entry:f};
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
  function f() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || !a.prototype.entries || "function" != typeof Object.seal) {
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
    if (f()) {
      return a;
    }
  }
  $jscomp.initSymbol();
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
  d.prototype.forEach = function(a, b) {
    var c = this;
    this.map_.forEach(function(d) {
      return a.call(b, d, d, c);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = new Set;
  a.add(-0);
  var f;
  a.forEach(function(a) {
    f = 1 / a;
  });
  return Infinity === f && a.has(0);
};

