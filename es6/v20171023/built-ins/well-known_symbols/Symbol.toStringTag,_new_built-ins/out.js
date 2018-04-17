var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, c, b) {
  e != Array.prototype && e != Object.prototype && (e[c] = b.value);
};
$jscomp.getGlobal = function(e) {
  return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var e = 0;
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + e++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var e = $jscomp.global.Symbol.iterator;
  e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(e) {
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < e.length ? {done:!1, value:e[c++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(e) {
  $jscomp.initSymbolIterator();
  e = {next:e};
  e[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return e;
};
$jscomp.makeIterator = function(e) {
  $jscomp.initSymbolIterator();
  var c = e[Symbol.iterator];
  return c ? c.call(e) : $jscomp.arrayIterator(e);
};
$jscomp.owns = function(e, c) {
  return Object.prototype.hasOwnProperty.call(e, c);
};
$jscomp.polyfill = function(e, c, b, g) {
  if (c) {
    b = $jscomp.global;
    e = e.split(".");
    for (g = 0; g < e.length - 1; g++) {
      var f = e[g];
      f in b || (b[f] = {});
      b = b[f];
    }
    e = e[e.length - 1];
    g = b[e];
    c = c(g);
    c != g && null != c && $jscomp.defineProperty(b, e, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(e) {
  function c(a) {
    $jscomp.owns(a, g) || $jscomp.defineProperty(a, g, {value:{}});
  }
  function b(a) {
    var d = Object[a];
    d && (Object[a] = function(a) {
      c(a);
      return d(a);
    });
  }
  if (function() {
    if (!e || !Object.seal) {
      return !1;
    }
    try {
      var a = Object.seal({}), d = Object.seal({}), k = new e([[a, 2], [d, 3]]);
      if (2 != k.get(a) || 3 != k.get(d)) {
        return !1;
      }
      k.delete(a);
      k.set(d, 4);
      return !k.has(a) && 4 == k.get(d);
    } catch (l) {
      return !1;
    }
  }()) {
    return e;
  }
  var g = "$jscomp_hidden_" + Math.random().toString().substring(2);
  b("freeze");
  b("preventExtensions");
  b("seal");
  var f = 0, h = function(a) {
    this.id_ = (f += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  h.prototype.set = function(a, d) {
    c(a);
    if (!$jscomp.owns(a, g)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[g][this.id_] = d;
    return this;
  };
  h.prototype.get = function(a) {
    return $jscomp.owns(a, g) ? a[g][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_);
  };
  h.prototype.delete = function(a) {
    return $jscomp.owns(a, g) && $jscomp.owns(a[g], this.id_) ? delete a[g][this.id_] : !1;
  };
  return h;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(e) {
  if (!$jscomp.ASSUME_NO_NATIVE_MAP && function() {
    if (!e || !e.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), a = new e($jscomp.makeIterator([[d, "s"]]));
      if ("s" != a.get(d) || 1 != a.size || a.get({x:4}) || a.set({x:4}, "t") != a || 2 != a.size) {
        return !1;
      }
      var b = a.entries(), c = b.next();
      if (c.done || c.value[0] != d || "s" != c.value[1]) {
        return !1;
      }
      c = b.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !b.next().done ? !1 : !0;
    } catch (n) {
      return !1;
    }
  }()) {
    return e;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var c = new WeakMap, b = function(d) {
    this.data_ = {};
    this.head_ = h();
    this.size = 0;
    if (d) {
      d = $jscomp.makeIterator(d);
      for (var a; !(a = d.next()).done;) {
        a = a.value, this.set(a[0], a[1]);
      }
    }
  };
  b.prototype.set = function(d, a) {
    var b = g(this, d);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = a : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:d, value:a}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(d) {
    d = g(this, d);
    return d.entry && d.list ? (d.list.splice(d.index, 1), d.list.length || delete this.data_[d.id], d.entry.previous.next = d.entry.next, d.entry.next.previous = d.entry.previous, d.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  b.prototype.has = function(d) {
    return !!g(this, d).entry;
  };
  b.prototype.get = function(d) {
    return (d = g(this, d).entry) && d.value;
  };
  b.prototype.entries = function() {
    return f(this, function(d) {
      return [d.key, d.value];
    });
  };
  b.prototype.keys = function() {
    return f(this, function(d) {
      return d.key;
    });
  };
  b.prototype.values = function() {
    return f(this, function(d) {
      return d.value;
    });
  };
  b.prototype.forEach = function(d, a) {
    for (var b = this.entries(), c; !(c = b.next()).done;) {
      c = c.value, d.call(a, c[1], c[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var g = function(d, b) {
    var e = b && typeof b;
    "object" == e || "function" == e ? c.has(b) ? e = c.get(b) : (e = "" + ++a, c.set(b, e)) : e = "p_" + b;
    var g = d.data_[e];
    if (g && $jscomp.owns(d.data_, e)) {
      for (d = 0; d < g.length; d++) {
        var f = g[d];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:e, list:g, index:d, entry:f};
        }
      }
    }
    return {id:e, list:g, index:-1, entry:void 0};
  }, f = function(d, a) {
    var b = d.head_;
    return $jscomp.iteratorPrototype(function() {
      if (b) {
        for (; b.head != d.head_;) {
          b = b.previous;
        }
        for (; b.next != b.head;) {
          return b = b.next, {done:!1, value:a(b)};
        }
        b = null;
      }
      return {done:!0, value:void 0};
    });
  }, h = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, a = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(e) {
  if (!$jscomp.ASSUME_NO_NATIVE_SET && function() {
    if (!e || !e.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new e($jscomp.makeIterator([b]));
      if (!c.has(b) || 1 != c.size || c.add(b) != c || 1 != c.size || c.add({x:4}) != c || 2 != c.size) {
        return !1;
      }
      var f = c.entries(), h = f.next();
      if (h.done || h.value[0] != b || h.value[1] != b) {
        return !1;
      }
      h = f.next();
      return h.done || h.value[0] == b || 4 != h.value[0].x || h.value[1] != h.value[0] ? !1 : f.next().done;
    } catch (a) {
      return !1;
    }
  }()) {
    return e;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var c = function(b) {
    this.map_ = new Map;
    if (b) {
      b = $jscomp.makeIterator(b);
      for (var c; !(c = b.next()).done;) {
        this.add(c.value);
      }
    }
    this.size = this.map_.size;
  };
  c.prototype.add = function(b) {
    this.map_.set(b, b);
    this.size = this.map_.size;
    return this;
  };
  c.prototype.delete = function(b) {
    b = this.map_.delete(b);
    this.size = this.map_.size;
    return b;
  };
  c.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  c.prototype.has = function(b) {
    return this.map_.has(b);
  };
  c.prototype.entries = function() {
    return this.map_.entries();
  };
  c.prototype.values = function() {
    return this.map_.values();
  };
  c.prototype.keys = c.prototype.values;
  c.prototype[Symbol.iterator] = c.prototype.values;
  c.prototype.forEach = function(b, c) {
    var e = this;
    this.map_.forEach(function(f) {
      return b.call(c, f, f, e);
    });
  };
  return c;
}, "es6", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(e) {
  function c() {
    this.batch_ = null;
  }
  function b(a) {
    return a instanceof f ? a : new f(function(d, b) {
      d(a);
    });
  }
  if (e && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return e;
  }
  c.prototype.asyncExecute = function(a) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this;
  };
  c.prototype.asyncExecuteBatch_ = function() {
    var a = this;
    this.asyncExecuteFunction(function() {
      a.executeBatch_();
    });
  };
  var g = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var d = 0; d < a.length; ++d) {
        var b = a[d];
        delete a[d];
        try {
          b();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var f = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var d = this.createResolveAndReject_();
    try {
      a(d.resolve, d.reject);
    } catch (k) {
      d.reject(k);
    }
  };
  f.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(c) {
        b || (b = !0, a.call(d, c));
      };
    }
    var d = this, b = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  f.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof f) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var d = null != a;
              break a;
            case "function":
              d = !0;
              break a;
            default:
              d = !1;
          }
        }
        d ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  f.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (k) {
      this.reject_(k);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
  };
  f.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  f.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  f.prototype.settle_ = function(a, d) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + d | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = d;
    this.executeOnSettledCallbacks_();
  };
  f.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, d = 0; d < a.length; ++d) {
        a[d].call(), a[d] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new c;
  f.prototype.settleSameAsPromise_ = function(a) {
    var d = this.createResolveAndReject_();
    a.callWhenSettled_(d.resolve, d.reject);
  };
  f.prototype.settleSameAsThenable_ = function(a, d) {
    var b = this.createResolveAndReject_();
    try {
      a.call(d, b.resolve, b.reject);
    } catch (l) {
      b.reject(l);
    }
  };
  f.prototype.then = function(a, d) {
    function b(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          c(a(b));
        } catch (m) {
          e(m);
        }
      } : b;
    }
    var c, e, g = new f(function(a, b) {
      c = a;
      e = b;
    });
    this.callWhenSettled_(b(a, c), b(d, e));
    return g;
  };
  f.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  f.prototype.callWhenSettled_ = function(a, b) {
    function d() {
      switch(c.state_) {
        case 1:
          a(c.result_);
          break;
        case 2:
          b(c.result_);
          break;
        default:
          throw Error("Unexpected state: " + c.state_);
      }
    }
    var c = this;
    null == this.onSettledCallbacks_ ? h.asyncExecute(d) : this.onSettledCallbacks_.push(function() {
      h.asyncExecute(d);
    });
  };
  f.resolve = b;
  f.reject = function(a) {
    return new f(function(b, c) {
      c(a);
    });
  };
  f.race = function(a) {
    return new f(function(d, c) {
      for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f = e.next()) {
        b(f.value).callWhenSettled_(d, c);
      }
    });
  };
  f.all = function(a) {
    var d = $jscomp.makeIterator(a), c = d.next();
    return c.done ? b([]) : new f(function(a, e) {
      function f(b) {
        return function(d) {
          g[b] = d;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, b(c.value).callWhenSettled_(f(g.length - 1), e), c = d.next();
      } while (!c.done);
    });
  };
  return f;
}, "es6", "es3");
module.exports = function() {
  var e = !0;
  $jscomp.initSymbol();
  var c = Symbol.toStringTag;
  [[String, "String Iterator"], [Array, "Array Iterator"], [Map, "Map Iterator"], [Set, "Set Iterator"]].forEach(function(b) {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var g = Object.getPrototypeOf((new b[0])[Symbol.iterator]());
    e = e && g.hasOwnProperty(c) && g[c] === b[1];
  });
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  return e = e && "GeneratorFunction" === Object.getPrototypeOf(function() {
    function b(b, a, d) {
      for (;;) {
        switch(c) {
          case 0:
            c = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var c = 0, e = {next:function(c) {
      return b(0.0, c, void 0);
    }, throw:function(c) {
      return b(1.0, void 0, c);
    }, return:function(b) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    e[Symbol.iterator] = function() {
      return this;
    };
    return e;
  })[c] && "Generator" === Object.getPrototypeOf(function() {
    function b(b, a, d) {
      for (;;) {
        switch(c) {
          case 0:
            c = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var c = 0, e = {next:function(c) {
      return b(0.0, c, void 0);
    }, throw:function(c) {
      return b(1.0, void 0, c);
    }, return:function(b) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    e[Symbol.iterator] = function() {
      return this;
    };
    return e;
  }())[c] && "Map" === Map.prototype[c] && "Set" === Set.prototype[c] && "ArrayBuffer" === ArrayBuffer.prototype[c] && "DataView" === DataView.prototype[c] && "Promise" === Promise.prototype[c] && "Symbol" === Symbol.prototype[c] && "function" === typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get;
};

