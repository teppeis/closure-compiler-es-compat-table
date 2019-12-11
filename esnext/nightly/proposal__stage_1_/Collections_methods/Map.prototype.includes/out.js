var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(c, e, f) {
      return c == a && "q" == e && f == d;
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
      var f = a[e];
      f in c || (c[f] = {});
      c = c[f];
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
      var k = Object.seal({}), b = Object.seal({}), c = new a([[k, 2], [b, 3]]);
      if (2 != c.get(k) || 3 != c.get(b)) {
        return !1;
      }
      c.delete(k);
      c.set(b, 4);
      return !c.has(k) && 4 == c.get(b);
    } catch (m) {
      return !1;
    }
  }
  function c() {
  }
  function e(a) {
    var b = typeof a;
    return "object" === b && null !== a || "function" === b;
  }
  function f(a) {
    if (!$jscomp.owns(a, g)) {
      var b = new c;
      $jscomp.defineProperty(a, g, {value:b});
    }
  }
  function h(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof c) {
        return a;
      }
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
  var g = "$jscomp_hidden_" + Math.random();
  h("freeze");
  h("preventExtensions");
  h("seal");
  var l = 0, b = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
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
    f(a);
    if (!$jscomp.owns(a, g)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[g][this.id_] = b;
    return this;
  };
  b.prototype.get = function(a) {
    return e(a) && $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  b.prototype.has = function(a) {
    return e(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  b.prototype.delete = function(a) {
    return e(a) && $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return b;
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
      var d = c.entries(), e = d.next();
      if (e.done || e.value[0] != b || "s" != e.value[1]) {
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
    if (d()) {
      return a;
    }
  }
  $jscomp.initSymbolIterator();
  var c = new WeakMap, e = function(a) {
    this.data_ = {};
    this.head_ = g();
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
    var b = f(this, a);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = c : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    a = f(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!f(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = f(this, a).entry) && a.value;
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
  var f = function(a, d) {
    var b = d && typeof d;
    "object" == b || "function" == b ? c.has(d) ? b = c.get(d) : (b = "" + ++l, c.set(d, b)) : b = "p_" + d;
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
  }, g = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
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
    var f = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + f, 0)); c < f; c++) {
      var h = d[c];
      if (h === a || Object.is(h, a)) {
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

