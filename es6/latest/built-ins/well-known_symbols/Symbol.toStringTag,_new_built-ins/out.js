var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, f, g) {
  a != Array.prototype && a != Object.prototype && (a[f] = g.value);
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
  return function(f) {
    return $jscomp.SYMBOL_PREFIX + (f || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(a) {
  var f = 0;
  return $jscomp.iteratorPrototype(function() {
    return f < a.length ? {done:!1, value:a[f++]} : {done:!0};
  });
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
    var a = {}, f = Object.create(new $jscomp.global.Proxy(a, {get:function(g, d, c) {
      return g == a && "q" == d && c == f;
    }}));
    return !0 === f.q;
  } catch (g) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var f = a[Symbol.iterator];
  return f ? f.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, f) {
  return Object.prototype.hasOwnProperty.call(a, f);
};
$jscomp.polyfill = function(a, f, g, d) {
  if (f) {
    g = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var c = a[d];
      c in g || (g[c] = {});
      g = g[c];
    }
    a = a[a.length - 1];
    d = g[a];
    f = f(d);
    f != d && null != f && $jscomp.defineProperty(g, a, {configurable:!0, writable:!0, value:f});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function f() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), e = Object.seal({}), c = new a([[b, 2], [e, 3]]);
      if (2 != c.get(b) || 3 != c.get(e)) {
        return !1;
      }
      c.delete(b);
      c.set(e, 4);
      return !c.has(b) && 4 == c.get(e);
    } catch (n) {
      return !1;
    }
  }
  function g(b) {
    $jscomp.owns(b, c) || $jscomp.defineProperty(b, c, {value:{}});
  }
  function d(b) {
    var e = Object[b];
    e && (Object[b] = function(b) {
      g(b);
      return e(b);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (f()) {
      return a;
    }
  }
  var c = "$jscomp_hidden_" + Math.random();
  d("freeze");
  d("preventExtensions");
  d("seal");
  var h = 0, b = function(b) {
    this.id_ = (h += Math.random() + 1).toString();
    if (b) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      b = $jscomp.makeIterator(b);
      for (var e; !(e = b.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  b.prototype.set = function(b, e) {
    g(b);
    if (!$jscomp.owns(b, c)) {
      throw Error("WeakMap key fail: " + b);
    }
    b[c][this.id_] = e;
    return this;
  };
  b.prototype.get = function(b) {
    return $jscomp.owns(b, c) ? b[c][this.id_] : void 0;
  };
  b.prototype.has = function(b) {
    return $jscomp.owns(b, c) && $jscomp.owns(b[c], this.id_);
  };
  b.prototype.delete = function(b) {
    return $jscomp.owns(b, c) && $jscomp.owns(b[c], this.id_) ? delete b[c][this.id_] : !1;
  };
  return b;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function f() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var d = c.entries(), k = d.next();
      if (k.done || k.value[0] != b || "s" != k.value[1]) {
        return !1;
      }
      k = d.next();
      return k.done || 4 != k.value[0].x || "t" != k.value[1] || !d.next().done ? !1 : !0;
    } catch (p) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (f()) {
      return a;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var g = new WeakMap, d = function(e) {
    this.data_ = {};
    this.head_ = b();
    this.size = 0;
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var c; !(c = e.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  d.prototype.set = function(b, a) {
    var e = c(this, b);
    e.list || (e.list = this.data_[e.id] = []);
    e.entry ? e.entry.value = a : (e.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:b, value:a}, e.list.push(e.entry), this.head_.previous.next = e.entry, this.head_.previous = e.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(b) {
    b = c(this, b);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.data_[b.id], b.entry.previous.next = b.entry.next, b.entry.next.previous = b.entry.previous, b.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = b();
    this.size = 0;
  };
  d.prototype.has = function(b) {
    return !!c(this, b).entry;
  };
  d.prototype.get = function(b) {
    return (b = c(this, b).entry) && b.value;
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
  d.prototype.forEach = function(b, c) {
    for (var e = this.entries(), a; !(a = e.next()).done;) {
      a = a.value, b.call(c, a[1], a[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var c = function(b, c) {
    var a = c && typeof c;
    "object" == a || "function" == a ? g.has(c) ? a = g.get(c) : (a = "" + ++k, g.set(c, a)) : a = "p_" + c;
    var e = b.data_[a];
    if (e && $jscomp.owns(b.data_, a)) {
      for (b = 0; b < e.length; b++) {
        var d = e[b];
        if (c !== c && d.key !== d.key || c === d.key) {
          return {id:a, list:e, index:b, entry:d};
        }
      }
    }
    return {id:a, list:e, index:-1, entry:void 0};
  }, h = function(b, c) {
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
  }, b = function() {
    var b = {};
    return b.previous = b.next = b.head = b;
  }, k = 0;
  return d;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function f() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), c = new a($jscomp.makeIterator([d]));
      if (!c.has(d) || 1 != c.size || c.add(d) != c || 1 != c.size || c.add({x:4}) != c || 2 != c.size) {
        return !1;
      }
      var g = c.entries(), b = g.next();
      if (b.done || b.value[0] != d || b.value[1] != d) {
        return !1;
      }
      b = g.next();
      return b.done || b.value[0] == d || 4 != b.value[0].x || b.value[1] != b.value[0] ? !1 : g.next().done;
    } catch (k) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (f()) {
      return a;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var g = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        this.add(c.value);
      }
    }
    this.size = this.map_.size;
  };
  g.prototype.add = function(a) {
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  g.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  g.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  g.prototype.has = function(a) {
    return this.map_.has(a);
  };
  g.prototype.entries = function() {
    return this.map_.entries();
  };
  g.prototype.values = function() {
    return this.map_.values();
  };
  g.prototype.keys = g.prototype.values;
  g.prototype[Symbol.iterator] = g.prototype.values;
  g.prototype.forEach = function(a, c) {
    var d = this;
    this.map_.forEach(function(b) {
      return a.call(c, b, b, d);
    });
  };
  return g;
}, "es6", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function f() {
    this.batch_ = null;
  }
  function g(b) {
    return b instanceof c ? b : new c(function(a, c) {
      a(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  f.prototype.asyncExecute = function(b) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(b);
    return this;
  };
  f.prototype.asyncExecuteBatch_ = function() {
    var b = this;
    this.asyncExecuteFunction(function() {
      b.executeBatch_();
    });
  };
  var d = $jscomp.global.setTimeout;
  f.prototype.asyncExecuteFunction = function(b) {
    d(b, 0);
  };
  f.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < b.length; ++a) {
        var c = b[a];
        delete b[a];
        try {
          c();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  f.prototype.asyncThrow_ = function(b) {
    this.asyncExecuteFunction(function() {
      throw b;
    });
  };
  var c = function(b) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      b(a.resolve, a.reject);
    } catch (e) {
      a.reject(e);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(e) {
        c || (c = !0, b.call(a, e));
      };
    }
    var a = this, c = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  c.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof c) {
        this.settleSameAsPromise_(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var a = null != b;
              break a;
            case "function":
              a = !0;
              break a;
            default:
              a = !1;
          }
        }
        a ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
      }
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(b) {
    var a = void 0;
    try {
      a = b.then;
    } catch (e) {
      this.reject_(e);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, b) : this.fulfill_(b);
  };
  c.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  c.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  c.prototype.settle_ = function(b, a) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + a | "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = a;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = this.onSettledCallbacks_, a = 0; a < b.length; ++a) {
        b[a].call(), b[a] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new f;
  c.prototype.settleSameAsPromise_ = function(b) {
    var a = this.createResolveAndReject_();
    b.callWhenSettled_(a.resolve, a.reject);
  };
  c.prototype.settleSameAsThenable_ = function(b, a) {
    var c = this.createResolveAndReject_();
    try {
      b.call(a, c.resolve, c.reject);
    } catch (l) {
      c.reject(l);
    }
  };
  c.prototype.then = function(b, a) {
    function e(b, a) {
      return "function" == typeof b ? function(a) {
        try {
          d(b(a));
        } catch (m) {
          g(m);
        }
      } : a;
    }
    var d, g, f = new c(function(b, a) {
      d = b;
      g = a;
    });
    this.callWhenSettled_(e(b, d), e(a, g));
    return f;
  };
  c.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  c.prototype.callWhenSettled_ = function(b, a) {
    function c() {
      switch(d.state_) {
        case 1:
          b(d.result_);
          break;
        case 2:
          a(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? h.asyncExecute(c) : this.onSettledCallbacks_.push(function() {
      h.asyncExecute(c);
    });
  };
  c.resolve = g;
  c.reject = function(b) {
    return new c(function(a, c) {
      c(b);
    });
  };
  c.race = function(b) {
    return new c(function(a, c) {
      for (var d = $jscomp.makeIterator(b), e = d.next(); !e.done; e = d.next()) {
        g(e.value).callWhenSettled_(a, c);
      }
    });
  };
  c.all = function(b) {
    var a = $jscomp.makeIterator(b), d = a.next();
    return d.done ? g([]) : new c(function(b, c) {
      function e(a) {
        return function(c) {
          f[a] = c;
          h--;
          0 == h && b(f);
        };
      }
      var f = [], h = 0;
      do {
        f.push(void 0), h++, g(d.value).callWhenSettled_(e(f.length - 1), c), d = a.next();
      } while (!d.done);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  var a = !0;
  $jscomp.initSymbol();
  var f = Symbol.toStringTag;
  [[String, "String Iterator"], [Array, "Array Iterator"], [Map, "Map Iterator"], [Set, "Set Iterator"]].forEach(function(g) {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var d = Object.getPrototypeOf((new g[0])[Symbol.iterator]());
    a = a && d.hasOwnProperty(f) && d[f] === g[1];
  });
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  return a = a && "GeneratorFunction" === Object.getPrototypeOf(function() {
    function a(a, b, c) {
      for (;;) {
        switch(d) {
          case 0:
            d = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var d = 0, c = {next:function(c) {
      return a(0.0, c, void 0);
    }, throw:function(c) {
      return a(1.0, void 0, c);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    c[Symbol.iterator] = function() {
      return this;
    };
    return c;
  })[f] && "Generator" === Object.getPrototypeOf(function() {
    function a(a, b, c) {
      for (;;) {
        switch(d) {
          case 0:
            d = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var d = 0, c = {next:function(c) {
      return a(0.0, c, void 0);
    }, throw:function(c) {
      return a(1.0, void 0, c);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    c[Symbol.iterator] = function() {
      return this;
    };
    return c;
  }())[f] && "Map" === Map.prototype[f] && "Set" === Set.prototype[f] && "ArrayBuffer" === ArrayBuffer.prototype[f] && "DataView" === DataView.prototype[f] && "Promise" === Promise.prototype[f] && "Symbol" === Symbol.prototype[f] && "function" === typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get;
};

