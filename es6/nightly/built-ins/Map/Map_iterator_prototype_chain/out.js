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
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
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
  function e(b) {
    var a = typeof b;
    return "object" === a && null !== b || "function" === a;
  }
  function g(b) {
    if (!$jscomp.owns(b, f)) {
      var a = new d;
      $jscomp.defineProperty(b, f, {value:a});
    }
  }
  function h(b) {
    var a = Object[b];
    a && (Object[b] = function(b) {
      if (b instanceof d) {
        return b;
      }
      g(b);
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
  var f = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var m = 0, b = function(b) {
    this.id_ = (m += Math.random() + 1).toString();
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var a; !(a = b.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  b.prototype.set = function(b, a) {
    if (!e(b)) {
      throw Error("Invalid WeakMap key");
    }
    g(b);
    if (!$jscomp.owns(b, f)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[f][this.id_] = a;
    return this;
  };
  b.prototype.get = function(b) {
    return e(b) && $jscomp.owns(b, f) ? b[f][this.id_] : void 0;
  };
  b.prototype.has = function(b) {
    return e(b) && $jscomp.owns(b, f) && $jscomp.owns(b[f], this.id_);
  };
  b.prototype.delete = function(b) {
    return e(b) && $jscomp.owns(b, f) && $jscomp.owns(b[f], this.id_) ? delete b[f][this.id_] : !1;
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
  var d = new WeakMap, e = function(b) {
    this.data_ = {};
    this.head_ = f();
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
  e.prototype.delete = function(b) {
    b = g(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  e.prototype.has = function(b) {
    return !!g(this, b).entry;
  };
  e.prototype.get = function(b) {
    return (b = g(this, b).entry) && b.value;
  };
  e.prototype.entries = function() {
    return h(this, function(b) {
      return [b.key, b.value];
    });
  };
  e.prototype.keys = function() {
    return h(this, function(b) {
      return b.key;
    });
  };
  e.prototype.values = function() {
    return h(this, function(b) {
      return b.value;
    });
  };
  e.prototype.forEach = function(b, a) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, b.call(a, d[1], d[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var g = function(b, a) {
    var c = a && typeof a;
    "object" == c || "function" == c ? d.has(a) ? c = d.get(a) : (c = "" + ++m, d.set(a, c)) : c = "p_" + a;
    var e = b.data_[c];
    if (e && $jscomp.owns(b.data_, c)) {
      for (b = 0; b < e.length; b++) {
        var f = e[b];
        if (a !== a && f.key !== f.key || a === f.key) {
          return {id:c, list:e, index:b, entry:f};
        }
      }
    }
    return {id:c, list:e, index:-1, entry:void 0};
  }, h = function(b, a) {
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

