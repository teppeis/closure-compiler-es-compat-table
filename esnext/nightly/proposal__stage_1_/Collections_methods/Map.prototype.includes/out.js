var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(c, e, g) {
      return c == a && "q" == e && g == d;
    }}));
    return !0 === d.q;
  } catch (c) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, c) {
  a != Array.prototype && a != Object.prototype && (a[d] = c.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, d) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:d});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(c) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + d++, c);
  }
  var d = 0;
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
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill = function(a, d, c, e) {
  if (d) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var g = a[e];
      g in c || (c[g] = {});
      c = c[g];
    }
    a = a[a.length - 1];
    e = c[a];
    d = d(e);
    d != e && null != d && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), l = Object.seal({}), h = new a([[b, 2], [l, 3]]);
      if (2 != h.get(b) || 3 != h.get(l)) {
        return !1;
      }
      h.delete(b);
      h.set(l, 4);
      return !h.has(b) && 4 == h.get(l);
    } catch (n) {
      return !1;
    }
  }
  function c() {
  }
  function e(b) {
    if (!$jscomp.owns(b, f)) {
      var a = new c;
      $jscomp.defineProperty(b, f, {value:a});
    }
  }
  function g(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof c) {
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
    if (d()) {
      return a;
    }
  }
  var f = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var m = 0, k = function(b) {
    this.id_ = (m += Math.random() + 1).toString();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  k.prototype.set = function(b, a) {
    e(b);
    if (!$jscomp.owns(b, f)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[f][this.id_] = a;
    return this;
  };
  k.prototype.get = function(b) {
    return $jscomp.owns(b, f) ? b[f][this.id_] : void 0;
  };
  k.prototype.has = function(b) {
    return $jscomp.owns(b, f) && $jscomp.owns(b[f], this.id_);
  };
  k.prototype.delete = function(b) {
    return $jscomp.owns(b, f) && $jscomp.owns(b[f], this.id_) ? delete b[f][this.id_] : !1;
  };
  return k;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var h = c.entries(), d = h.next();
      if (d.done || d.value[0] != b || "s" != d.value[1]) {
        return !1;
      }
      d = h.next();
      return d.done || 4 != d.value[0].x || "t" != d.value[1] || !h.next().done ? !1 : !0;
    } catch (p) {
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
  $jscomp.initSymbolIterator();
  var c = new WeakMap, e = function(b) {
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
    var c = g(this, b);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = a : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    a = g(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = m();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!g(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = g(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return f(this, function(a) {
      return [a.key, a.value];
    });
  };
  e.prototype.keys = function() {
    return f(this, function(a) {
      return a.key;
    });
  };
  e.prototype.values = function() {
    return f(this, function(a) {
      return a.value;
    });
  };
  e.prototype.forEach = function(a, c) {
    for (var b = this.entries(), d; !(d = b.next()).done;) {
      d = d.value, a.call(c, d[1], d[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var g = function(a, d) {
    var b = d && typeof d;
    "object" == b || "function" == b ? c.has(d) ? b = c.get(d) : (b = "" + ++k, c.set(d, b)) : b = "p_" + d;
    var e = a.data_[b];
    if (e && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (d !== d && f.key !== f.key || d === f.key) {
          return {id:b, list:e, index:a, entry:f};
        }
      }
    }
    return {id:b, list:e, index:-1, entry:void 0};
  }, f = function(a, d) {
    var b = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (b) {
        for (; b.head != a.head_;) {
          b = b.previous;
        }
        for (; b.next != b.head;) {
          return b = b.next, {done:!1, value:d(b)};
        }
        b = null;
      }
      return {done:!0, value:void 0};
    });
  }, m = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, k = 0;
  return e;
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(a, c) {
    return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(a) {
  return a ? a : function(a, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var g = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + g, 0)); c < g; c++) {
      var f = d[c];
      if (f === a || Object.is(f, a)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function(a, d, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (d instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.includes", function(a) {
  return a ? a : function(a, c) {
    return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, c || 0);
  };
}, "es6", "es3");
module.exports = function() {
  return (new Map([[1, 2], [2, NaN]])).includes(2) && (new Map([[1, 2], [2, NaN]])).includes(NaN);
};

