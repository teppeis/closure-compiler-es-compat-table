var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var e = 0; e < a.length; ++e) {
    var d = a[e];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, e = Object.create(new $jscomp.global.Proxy(a, {get:function(d, b, g) {
      return d == a && "q" == b && g == e;
    }}));
    return !0 === e.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var e = 0;
  return function() {
    return e < a.length ? {done:!1, value:a[e++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, d) {
  a != Array.prototype && a != Object.prototype && (a[e] = d.value);
};
$jscomp.polyfill = function(a, e, d, b) {
  if (e) {
    d = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var g = a[b];
      g in d || (d[g] = {});
      d = d[g];
    }
    a = a[a.length - 1];
    b = d[a];
    e = e(b);
    e != b && null != e && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbol();
  var e = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  e.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = 0, b = function(a) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new e("jscomp_symbol_" + (a || "") + "_" + d++, a);
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
$jscomp.makeIterator = function(a) {
  var e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return e ? e.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, e) {
  return Object.prototype.hasOwnProperty.call(a, e);
};
$jscomp.polyfill("WeakMap", function(a) {
  function e() {
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
    } catch (m) {
      return !1;
    }
  }
  function d() {
  }
  function b(a) {
    var c = typeof a;
    return "object" === c && null !== a || "function" === c;
  }
  function g(a) {
    if (!$jscomp.owns(a, f)) {
      var c = new d;
      $jscomp.defineProperty(a, f, {value:c});
    }
  }
  function h(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      if (a instanceof d) {
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
    if (e()) {
      return a;
    }
  }
  var f = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var l = 0, c = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
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
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != b.get(c) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var d = b.entries(), e = d.next();
      if (e.done || e.value[0] != c || "s" != e.value[1]) {
        return !1;
      }
      e = d.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0;
    } catch (m) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (e()) {
      return a;
    }
  }
  $jscomp.initSymbolIterator();
  var d = new WeakMap, b = function(a) {
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
    "object" == c || "function" == c ? d.has(b) ? c = d.get(b) : (c = "" + ++l, d.set(b, c)) : c = "p_" + b;
    var e = a.data_[c];
    if (e && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < e.length; a++) {
        var g = e[a];
        if (b !== b && g.key !== g.key || b === g.key) {
          return {id:c, list:e, index:a, entry:g};
        }
      }
    }
    return {id:c, list:e, index:-1, entry:void 0};
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
  }, l = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function e() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), d = new a($jscomp.makeIterator([b]));
      if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), f = e.next();
      if (f.done || f.value[0] != b || f.value[1] != b) {
        return !1;
      }
      f = e.next();
      return f.done || f.value[0] == b || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done;
    } catch (l) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (e()) {
      return a;
    }
  }
  $jscomp.initSymbolIterator();
  var d = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
    this.size = this.map_.size;
  };
  d.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
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
  d.prototype.forEach = function(a, d) {
    var b = this;
    this.map_.forEach(function(e) {
      return a.call(d, e, e, b);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  return (new Set([1, 2, 3])).isSubsetOf([5, 4, 3, 2, 1]);
};

