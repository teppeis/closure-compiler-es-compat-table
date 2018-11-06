var $jscomp = $jscomp || {};
$jscomp.scope = {};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, f) {
  a != Array.prototype && a != Object.prototype && (a[c] = f.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + a++;
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
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(f, e, h) {
      return f == a && "q" == e && h == c;
    }}));
    return !0 === c.q;
  } catch (f) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill = function(a, c, f, e) {
  if (c) {
    f = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var h = a[e];
      h in f || (f[h] = {});
      f = f[h];
    }
    a = a[a.length - 1];
    e = f[a];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), k = Object.seal({}), d = new a([[b, 2], [k, 3]]);
      if (2 != d.get(b) || 3 != d.get(k)) {
        return !1;
      }
      d.delete(b);
      d.set(k, 4);
      return !d.has(b) && 4 == d.get(k);
    } catch (n) {
      return !1;
    }
  }
  function f() {
  }
  function e(b) {
    if (!$jscomp.owns(b, g)) {
      var a = new f;
      $jscomp.defineProperty(b, g, {value:a});
    }
  }
  function h(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof f) {
        return b;
      }
      e(b);
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
    e(b);
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
      var d = k.entries(), c = d.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = d.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !d.next().done ? !1 : !0;
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
  var f = new WeakMap, e = function(b) {
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
  e.prototype.set = function(b, a) {
    b = 0 === b ? 0 : b;
    var d = h(this, b);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = a : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(b) {
    b = h(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = m();
    this.size = 0;
  };
  e.prototype.has = function(b) {
    return !!h(this, b).entry;
  };
  e.prototype.get = function(b) {
    return (b = h(this, b).entry) && b.value;
  };
  e.prototype.entries = function() {
    return g(this, function(b) {
      return [b.key, b.value];
    });
  };
  e.prototype.keys = function() {
    return g(this, function(b) {
      return b.key;
    });
  };
  e.prototype.values = function() {
    return g(this, function(b) {
      return b.value;
    });
  };
  e.prototype.forEach = function(b, a) {
    for (var d = this.entries(), c; !(c = d.next()).done;) {
      c = c.value, b.call(a, c[1], c[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var h = function(b, a) {
    var d = a && typeof a;
    "object" == d || "function" == d ? f.has(a) ? d = f.get(a) : (d = "" + ++l, f.set(a, d)) : d = "p_" + a;
    var c = b.data_[d];
    if (c && $jscomp.owns(b.data_, d)) {
      for (b = 0; b < c.length; b++) {
        var e = c[b];
        if (a !== a && e.key !== e.key || a === e.key) {
          return {id:d, list:c, index:b, entry:e};
        }
      }
    }
    return {id:d, list:c, index:-1, entry:void 0};
  }, g = function(b, a) {
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
  }, m = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return e;
}, "es6", "es3");
module.exports = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  return "function" === typeof Map.prototype[Symbol.iterator];
};

