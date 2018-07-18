var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(f, c, e) {
      return f == a && "q" == c && e == d;
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
      var e = a[c];
      e in f || (f[e] = {});
      f = f[e];
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
      var k = Object.seal({}), b = Object.seal({}), g = new a([[k, 2], [b, 3]]);
      if (2 != g.get(k) || 3 != g.get(b)) {
        return !1;
      }
      g.delete(k);
      g.set(b, 4);
      return !g.has(k) && 4 == g.get(b);
    } catch (m) {
      return !1;
    }
  }
  function f(a) {
    $jscomp.owns(a, e) || $jscomp.defineProperty(a, e, {value:{}});
  }
  function c(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      f(a);
      return b(a);
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
  var e = "$jscomp_hidden_" + Math.random();
  c("freeze");
  c("preventExtensions");
  c("seal");
  var l = 0, h = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  h.prototype.set = function(a, b) {
    f(a);
    if (!$jscomp.owns(a, e)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[e][this.id_] = b;
    return this;
  };
  h.prototype.get = function(a) {
    return $jscomp.owns(a, e) ? a[e][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_);
  };
  h.prototype.delete = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1;
  };
  return h;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), g = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != g.get(b) || 1 != g.size || g.get({x:4}) || g.set({x:4}, "t") != g || 2 != g.size) {
        return !1;
      }
      var m = g.entries(), c = m.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = m.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !m.next().done ? !1 : !0;
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
    this.head_ = h();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  c.prototype.set = function(a, c) {
    a = 0 === a ? 0 : a;
    var b = e(this, a);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = c : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = e(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!e(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = e(this, a).entry) && a.value;
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
  c.prototype.forEach = function(a, c) {
    for (var b = this.entries(), d; !(d = b.next()).done;) {
      d = d.value, a.call(c, d[1], d[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var e = function(a, c) {
    var b = c && typeof c;
    "object" == b || "function" == b ? f.has(c) ? b = f.get(c) : (b = "" + ++k, f.set(c, b)) : b = "p_" + c;
    var d = a.data_[b];
    if (d && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < d.length; a++) {
        var e = d[a];
        if (c !== c && e.key !== e.key || c === e.key) {
          return {id:b, list:d, index:a, entry:e};
        }
      }
    }
    return {id:b, list:d, index:-1, entry:void 0};
  }, l = function(a, c) {
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
  }, k = 0;
  return c;
}, "es6", "es3");
module.exports = function() {
  var a = !1, d = Map.prototype.set;
  Map.prototype.set = function(d, c) {
    a = !0;
  };
  new Map([[1, 2]]);
  Map.prototype.set = d;
  return a;
};

