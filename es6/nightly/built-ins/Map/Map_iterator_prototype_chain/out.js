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
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  a != Array.prototype && a != Object.prototype && (a[c] = d.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
    if (d && d.Math == Math) {
      return d;
    }
  }
  return globalThis;
};
$jscomp.global = $jscomp.getGlobal(this);
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
  function a(d) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (d || "") + "_" + c++, d);
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
$jscomp.polyfill = function(a, c, d, e) {
  if (c) {
    d = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var g = a[e];
      g in d || (d[g] = {});
      d = d[g];
    }
    a = a[a.length - 1];
    e = d[a];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("globalThis", function(a) {
  return a || $jscomp.global;
}, "es_next", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(d, e, g) {
      return d == a && "q" == e && g == c;
    }}));
    return !0 === c.q;
  } catch (d) {
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
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), b = Object.seal({}), c = new a([[k, 2], [b, 3]]);
      if (2 != c.get(k) || 3 != c.get(b)) {
        return !1;
      }
      c.delete(k);
      c.set(b, 4);
      return !c.has(k) && 4 == c.get(b);
    } catch (n) {
      return !1;
    }
  }
  function d() {
  }
  function e(a) {
    var b = typeof a;
    return "object" === b && null !== a || "function" === b;
  }
  function g(a) {
    if (!$jscomp.owns(a, f)) {
      var b = new d;
      $jscomp.defineProperty(a, f, {value:b});
    }
  }
  function h(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof d) {
        return a;
      }
      g(a);
      return b(a);
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
  var f = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var m = 0, b = function(a) {
    this.id_ = (m += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  b.prototype.set = function(a, b) {
    if (!e(a)) {
      throw Error("Invalid WeakMap key");
    }
    g(a);
    if (!$jscomp.owns(a, f)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[f][this.id_] = b;
    return this;
  };
  b.prototype.get = function(a) {
    return e(a) && $jscomp.owns(a, f) ? a[f][this.id_] : void 0;
  };
  b.prototype.has = function(a) {
    return e(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_);
  };
  b.prototype.delete = function(a) {
    return e(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_) ? delete a[f][this.id_] : !1;
  };
  return b;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function c() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var l = c.entries(), d = l.next();
      if (d.done || d.value[0] != b || "s" != d.value[1]) {
        return !1;
      }
      d = l.next();
      return d.done || 4 != d.value[0].x || "t" != d.value[1] || !l.next().done ? !1 : !0;
    } catch (n) {
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
  var d = new WeakMap, e = function(a) {
    this.data_ = {};
    this.head_ = f();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  e.prototype.set = function(a, c) {
    a = 0 === a ? 0 : a;
    var b = g(this, a);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = c : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    a = g(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!g(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = g(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  e.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  e.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  e.prototype.forEach = function(a, c) {
    for (var b = this.entries(), d; !(d = b.next()).done;) {
      d = d.value, a.call(c, d[1], d[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var g = function(a, c) {
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
  }, f = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, m = 0;
  return e;
}, "es6", "es3");
module.exports = function() {
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var a = (new Map)[Symbol.iterator](), c = Object.getPrototypeOf(a), d = Object.getPrototypeOf(c);
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  return d.hasOwnProperty(Symbol.iterator) && !c.hasOwnProperty(Symbol.iterator) && !a.hasOwnProperty(Symbol.iterator) && a[Symbol.iterator]() === a;
};

