var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(f, d, e) {
      return f == a && "q" == d && e == c;
    }}));
    return !0 === c.q;
  } catch (f) {
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, f) {
  a != Array.prototype && a != Object.prototype && (a[c] = f.value);
};
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
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill = function(a, c, f, d) {
  if (c) {
    f = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in f || (f[e] = {});
      f = f[e];
    }
    a = a[a.length - 1];
    d = f[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), k = Object.seal({}), g = new a([[b, 2], [k, 3]]);
      if (2 != g.get(b) || 3 != g.get(k)) {
        return !1;
      }
      g.delete(b);
      g.set(k, 4);
      return !g.has(b) && 4 == g.get(k);
    } catch (n) {
      return !1;
    }
  }
  function f() {
  }
  function d(b) {
    if (!$jscomp.owns(b, h)) {
      var a = new f;
      $jscomp.defineProperty(b, h, {value:a});
    }
  }
  function e(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof f) {
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
  var h = "$jscomp_hidden_" + Math.random();
  e("freeze");
  e("preventExtensions");
  e("seal");
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
    if (!$jscomp.owns(b, h)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[h][this.id_] = a;
    return this;
  };
  l.prototype.get = function(b) {
    return $jscomp.owns(b, h) ? b[h][this.id_] : void 0;
  };
  l.prototype.has = function(b) {
    return $jscomp.owns(b, h) && $jscomp.owns(b[h], this.id_);
  };
  l.prototype.delete = function(b) {
    return $jscomp.owns(b, h) && $jscomp.owns(b[h], this.id_) ? delete b[h][this.id_] : !1;
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
      var g = k.entries(), c = g.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = g.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !g.next().done ? !1 : !0;
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
  var f = new WeakMap, d = function(b) {
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
    var g = e(this, b);
    g.list || (g.list = this.data_[g.id] = []);
    g.entry ? g.entry.value = a : (g.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, g.list.push(g.entry), this.head_.previous.next = g.entry, this.head_.previous = g.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(b) {
    b = e(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = m();
    this.size = 0;
  };
  d.prototype.has = function(b) {
    return !!e(this, b).entry;
  };
  d.prototype.get = function(b) {
    return (b = e(this, b).entry) && b.value;
  };
  d.prototype.entries = function() {
    return h(this, function(b) {
      return [b.key, b.value];
    });
  };
  d.prototype.keys = function() {
    return h(this, function(b) {
      return b.key;
    });
  };
  d.prototype.values = function() {
    return h(this, function(b) {
      return b.value;
    });
  };
  d.prototype.forEach = function(b, a) {
    for (var g = this.entries(), c; !(c = g.next()).done;) {
      c = c.value, b.call(a, c[1], c[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var e = function(a, c) {
    var b = c && typeof c;
    "object" == b || "function" == b ? f.has(c) ? b = f.get(c) : (b = "" + ++l, f.set(c, b)) : b = "p_" + c;
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
  }, h = function(a, c) {
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
$jscomp.findInternal = function(a, c, f) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var h = a[e];
    if (c.call(f, h, e, a)) {
      return {i:e, v:h};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(a, f) {
    return $jscomp.findInternal(this, a, f).v;
  };
}, "es6", "es3");
module.exports = function() {
  return 3 === (new Map([[1, 2], [2, 3], [3, 4]])).find(function(a) {
    return a % 2;
  });
};

