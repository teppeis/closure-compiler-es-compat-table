var $jscomp = $jscomp || {};
$jscomp.scope = {};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, e) {
  a != Array.prototype && a != Object.prototype && (a[d] = e.value);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var d = 0; d < a.length; ++d) {
    var e = a[d];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, d, e, b) {
  if (d) {
    e = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var g = a[b];
      g in e || (e[g] = {});
      e = e[g];
    }
    a = a[a.length - 1];
    b = e[a];
    d = d(b);
    d != b && null != d && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbol();
  var d = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = 0, b = function(a) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d("jscomp_symbol_" + (a || "") + "_" + e++, a);
  };
  return b;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
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
$jscomp.polyfill("Object.fromEntries", function(a) {
  return a ? a : function(a) {
    var d = {};
    $jscomp.initSymbolIterator();
    if (!(Symbol.iterator in a)) {
      throw new TypeError("" + a + " is not iterable");
    }
    a = a[Symbol.iterator].call(a);
    for (var b = a.next(); !b.done; b = a.next()) {
      b = b.value;
      if (Object(b) !== b) {
        throw new TypeError("iterable for fromEntries should yield objects");
      }
      d[b[0]] = b[1];
    }
    return d;
  };
}, "es_2019", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(e, b, g) {
      return e == a && "q" == b && g == d;
    }}));
    return !0 === d.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), c = Object.seal({}), b = new a([[k, 2], [c, 3]]);
      if (2 != b.get(k) || 3 != b.get(c)) {
        return !1;
      }
      b.delete(k);
      b.set(c, 4);
      return !b.has(k) && 4 == b.get(c);
    } catch (n) {
      return !1;
    }
  }
  function e() {
  }
  function b(a) {
    var c = typeof a;
    return "object" === c && null !== a || "function" === c;
  }
  function g(a) {
    if (!$jscomp.owns(a, f)) {
      var c = new e;
      $jscomp.defineProperty(a, f, {value:c});
    }
  }
  function h(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      if (a instanceof e) {
        return a;
      }
      g(a);
      return c(a);
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
  h("freeze");
  h("preventExtensions");
  h("seal");
  var m = 0, c = function(a) {
    this.id_ = (m += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  c.prototype.set = function(a, c) {
    if (!b(a)) {
      throw Error("Invalid WeakMap key");
    }
    g(a);
    if (!$jscomp.owns(a, f)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[f][this.id_] = c;
    return this;
  };
  c.prototype.get = function(a) {
    return b(a) && $jscomp.owns(a, f) ? a[f][this.id_] : void 0;
  };
  c.prototype.has = function(a) {
    return b(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_);
  };
  c.prototype.delete = function(a) {
    return b(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_) ? delete a[f][this.id_] : !1;
  };
  return c;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != b.get(c) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var l = b.entries(), d = l.next();
      if (d.done || d.value[0] != c || "s" != d.value[1]) {
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
    if (d()) {
      return a;
    }
  }
  $jscomp.initSymbolIterator();
  var e = new WeakMap, b = function(a) {
    this.data_ = {};
    this.head_ = f();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  b.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var c = g(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(a) {
    a = g(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  b.prototype.has = function(a) {
    return !!g(this, a).entry;
  };
  b.prototype.get = function(a) {
    return (a = g(this, a).entry) && a.value;
  };
  b.prototype.entries = function() {
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  b.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  b.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  b.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var g = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? e.has(b) ? c = e.get(b) : (c = "" + ++m, e.set(b, c)) : c = "p_" + b;
    var d = a.data_[c];
    if (d && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < d.length; a++) {
        var f = d[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:c, list:d, index:a, entry:f};
        }
      }
    }
    return {id:c, list:d, index:-1, entry:void 0};
  }, h = function(a, b) {
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
  }, f = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, m = 0;
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = Object.fromEntries(new Map([["foo", 42], ["bar", 23]]));
  return 42 === a.foo && 23 === a.bar;
};

