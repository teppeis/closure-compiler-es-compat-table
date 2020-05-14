var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var e = a[b];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(e, d, f) {
      return e == a && "q" == d && f == b;
    }}));
    return !0 === b.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = e.value;
  return a;
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var e = $jscomp.propertyToPolyfillSymbol[b];
  if (null == e) {
    return a[b];
  }
  e = a[e];
  return void 0 !== e ? e : a[b];
};
$jscomp.polyfill = function(a, b, e, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, e, d) : $jscomp.polyfillUnisolated(a, b, e, d));
};
$jscomp.polyfillUnisolated = function(a, b, e, d) {
  e = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var f = a[d];
    f in e || (e[f] = {});
    e = e[f];
  }
  a = a[a.length - 1];
  d = e[a];
  b = b(d);
  b != d && null != b && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, e, d) {
  var f = a.split(".");
  a = 1 === f.length;
  d = f[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var h = 0; h < f.length - 1; h++) {
    var g = f[h];
    g in d || (d[g] = {});
    d = d[g];
  }
  f = f[f.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? d[f] : null;
  b = b(e);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:b}) : b !== e && ($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f, f = $jscomp.propertyToPolyfillSymbol[f], $jscomp.defineProperty(d, f, {configurable:!0, writable:!0, value:b})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbol();
  var b = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = 0, d = function(a) {
    if (this instanceof d) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (a || "") + "_" + e++, a);
  };
  return d;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  $jscomp.initSymbolIterator();
  a = Symbol("Symbol.iterator");
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  return a;
}, "es6", "es3");
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbolAsyncIterator = function() {
  };
  Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"));
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
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
  function e() {
  }
  function d(a) {
    var c = typeof a;
    return "object" === c && null !== a || "function" === c;
  }
  function f(a) {
    if (!$jscomp.owns(a, g)) {
      var c = new e;
      $jscomp.defineProperty(a, g, {value:c});
    }
  }
  function h(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      if (a instanceof e) {
        return a;
      }
      f(a);
      return c(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (b()) {
      return a;
    }
  }
  var g = "$jscomp_hidden_" + Math.random();
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
    if (!d(a)) {
      throw Error("Invalid WeakMap key");
    }
    f(a);
    if (!$jscomp.owns(a, g)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[g][this.id_] = c;
    return this;
  };
  c.prototype.get = function(a) {
    return d(a) && $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  c.prototype.has = function(a) {
    return d(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  c.prototype.delete = function(a) {
    return d(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return c;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
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
    if (b()) {
      return a;
    }
  }
  $jscomp.initSymbolIterator();
  var e = new WeakMap, d = function(a) {
    this.data_ = {};
    this.head_ = g();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  d.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var c = f(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b, }, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(a) {
    a = f(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  d.prototype.has = function(a) {
    return !!f(this, a).entry;
  };
  d.prototype.get = function(a) {
    return (a = f(this, a).entry) && a.value;
  };
  d.prototype.entries = function() {
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  d.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  d.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  d.prototype.forEach = function(a, b) {
    for (var c = this.entries(), e; !(e = c.next()).done;) {
      e = e.value, a.call(b, e[1], e[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var f = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? e.has(b) ? c = e.get(b) : (c = "" + ++l, e.set(b, c)) : c = "p_" + b;
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
  }, g = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = !1, b = Map.prototype.set;
  Map.prototype.set = function(b, d) {
    a = !0;
  };
  new Map([[1, 2]]);
  Map.prototype.set = b;
  return a;
};

