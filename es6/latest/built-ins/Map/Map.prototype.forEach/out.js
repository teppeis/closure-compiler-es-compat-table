var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
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
      var a = Object.seal({}), k = Object.seal({}), d = new b([[a, 2], [k, 3]]);
      if (2 != d.get(a) || 3 != d.get(k)) {
        return !1;
      }
      d.delete(a);
      d.set(k, 4);
      return !d.has(a) && 4 == d.get(k);
    } catch (n) {
      return !1;
    }
  }
  function f() {
  }
  function e(a) {
    if (!$jscomp.owns(a, g)) {
      var b = new f;
      $jscomp.defineProperty(a, g, {value:b});
    }
  }
  function h(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof f) {
        return a;
      }
      e(a);
      return b(a);
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
  h("freeze");
  h("preventExtensions");
  h("seal");
  var m = 0, l = function(a) {
    this.id_ = (m += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  l.prototype.set = function(a, b) {
    e(a);
    if (!$jscomp.owns(a, g)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[g][this.id_] = b;
    return this;
  };
  l.prototype.get = function(a) {
    return $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  l.prototype.has = function(a) {
    return $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  l.prototype.delete = function(a) {
    return $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return l;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(b) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var a = Object.seal({x:4}), k = new b($jscomp.makeIterator([[a, "s"]]));
      if ("s" != k.get(a) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var d = k.entries(), c = d.next();
      if (c.done || c.value[0] != a || "s" != c.value[1]) {
        return !1;
      }
      c = d.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !d.next().done ? !1 : !0;
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
    this.head_ = m();
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
    this.head_ = this.head_.previous = m();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!h(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = h(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  e.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  e.prototype.values = function() {
    return g(this, function(a) {
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
    var d = b && typeof b;
    "object" == d || "function" == d ? f.has(b) ? d = f.get(b) : (d = "" + ++l, f.set(b, d)) : d = "p_" + b;
    var c = a.data_[d];
    if (c && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < c.length; a++) {
        var e = c[a];
        if (b !== b && e.key !== e.key || b === e.key) {
          return {id:d, list:c, index:a, entry:e};
        }
      }
    }
    return {id:d, list:c, index:-1, entry:void 0};
  }, g = function(b, c) {
    var a = b.head_;
    return $jscomp.iteratorPrototype(function() {
      if (a) {
        for (; a.head != b.head_;) {
          a = a.previous;
        }
        for (; a.next != a.head;) {
          return a = a.next, {done:!1, value:c(a)};
        }
        a = null;
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
  return "function" === typeof Map.prototype.forEach;
};

