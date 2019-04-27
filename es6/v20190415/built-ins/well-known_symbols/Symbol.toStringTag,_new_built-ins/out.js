var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, e) {
  a != Array.prototype && a != Object.prototype && (a[b] = e.value);
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
$jscomp.SymbolClass = function(a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:b});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(e) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + b++, e);
  }
  var b = 0;
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
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (e) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
  a.__proto__ = b;
  if (a.__proto__ !== b) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(a) {
  if (!(a instanceof Object)) {
    throw new TypeError("Iterator result " + a + " is not an object");
  }
};
$jscomp.generator.Context = function() {
  this.isRunning_ = !1;
  this.yieldAllIterator_ = null;
  this.yieldResult = void 0;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
$jscomp.generator.Context.prototype.start_ = function() {
  if (this.isRunning_) {
    throw new TypeError("Generator is already running");
  }
  this.isRunning_ = !0;
};
$jscomp.generator.Context.prototype.stop_ = function() {
  this.isRunning_ = !1;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function(a) {
  this.yieldResult = a;
};
$jscomp.generator.Context.prototype.throw_ = function(a) {
  this.abruptCompletion_ = {exception:a, isException:!0};
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype.return = function(a) {
  this.abruptCompletion_ = {return:a};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(a) {
  this.abruptCompletion_ = {jumpTo:a};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function(a, b) {
  this.nextAddress = b;
  return {value:a};
};
$jscomp.generator.Context.prototype.yieldAll = function(a, b) {
  a = $jscomp.makeIterator(a);
  var e = a.next();
  $jscomp.generator.ensureIteratorResultIsObject_(e);
  if (e.done) {
    this.yieldResult = e.value, this.nextAddress = b;
  } else {
    return this.yieldAllIterator_ = a, this.yield(e.value, b);
  }
};
$jscomp.generator.Context.prototype.jumpTo = function(a) {
  this.nextAddress = a;
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(a, b) {
  this.catchAddress_ = a;
  void 0 != b && (this.finallyAddress_ = b);
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(a) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = a || 0;
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(a, b) {
  this.nextAddress = a;
  this.catchAddress_ = b || 0;
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(a) {
  this.catchAddress_ = a || 0;
  a = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return a;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, e) {
  e ? this.finallyContexts_[e] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
  this.catchAddress_ = a || 0;
  this.finallyAddress_ = b || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(a, b) {
  b = this.finallyContexts_.splice(b || 0)[0];
  if (b = this.abruptCompletion_ = this.abruptCompletion_ || b) {
    if (b.isException) {
      return this.jumpToErrorHandler_();
    }
    void 0 != b.jumpTo && this.finallyAddress_ < b.jumpTo ? (this.nextAddress = b.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_;
  } else {
    this.nextAddress = a;
  }
};
$jscomp.generator.Context.prototype.forIn = function(a) {
  return new $jscomp.generator.Context.PropertyIterator(a);
};
$jscomp.generator.Context.PropertyIterator = function(a) {
  this.object_ = a;
  this.properties_ = [];
  for (var b in a) {
    this.properties_.push(b);
  }
  this.properties_.reverse();
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
  for (; 0 < this.properties_.length;) {
    var a = this.properties_.pop();
    if (a in this.object_) {
      return a;
    }
  }
  return null;
};
$jscomp.generator.Engine_ = function(a) {
  this.context_ = new $jscomp.generator.Context;
  this.program_ = a;
};
$jscomp.generator.Engine_.prototype.next_ = function(a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
  }
  this.context_.next_(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function(a) {
  this.context_.start_();
  var b = this.context_.yieldAllIterator_;
  if (b) {
    return this.yieldAllStep_("return" in b ? b["return"] : function(a) {
      return {value:a, done:!0};
    }, a, this.context_.return);
  }
  this.context_.return(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function(a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
  }
  this.context_.throw_(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, e) {
  try {
    var g = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(g);
    if (!g.done) {
      return this.context_.stop_(), g;
    }
    var f = g.value;
  } catch (h) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(h), this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  e.call(this.context_, f);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
  for (; this.context_.nextAddress;) {
    try {
      var a = this.program_(this.context_);
      if (a) {
        return this.context_.stop_(), {value:a.value, done:!1};
      }
    } catch (b) {
      this.context_.yieldResult = void 0, this.context_.throw_(b);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    a = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (a.isException) {
      throw a.exception;
    }
    return {value:a.return, done:!0};
  }
  return {value:void 0, done:!0};
};
$jscomp.generator.Generator_ = function(a) {
  this.next = function(b) {
    return a.next_(b);
  };
  this.throw = function(b) {
    return a.throw_(b);
  };
  this.return = function(b) {
    return a.return_(b);
  };
  $jscomp.initSymbolIterator();
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(a, b) {
  b = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
  $jscomp.setPrototypeOf && $jscomp.setPrototypeOf(b, a.prototype);
  return b;
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(e, g, f) {
      return e == a && "q" == g && f == b;
    }}));
    return !0 === b.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill = function(a, b, e, g) {
  if (b) {
    e = $jscomp.global;
    a = a.split(".");
    for (g = 0; g < a.length - 1; g++) {
      var f = a[g];
      f in e || (e[f] = {});
      e = e[f];
    }
    a = a[a.length - 1];
    g = e[a];
    b = b(g);
    b != g && null != b && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), b = Object.seal({}), d = new a([[c, 2], [b, 3]]);
      if (2 != d.get(c) || 3 != d.get(b)) {
        return !1;
      }
      d.delete(c);
      d.set(b, 4);
      return !d.has(c) && 4 == d.get(b);
    } catch (n) {
      return !1;
    }
  }
  function e() {
  }
  function g(a) {
    if (!$jscomp.owns(a, h)) {
      var c = new e;
      $jscomp.defineProperty(a, h, {value:c});
    }
  }
  function f(a) {
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
    if (b()) {
      return a;
    }
  }
  var h = "$jscomp_hidden_" + Math.random();
  f("freeze");
  f("preventExtensions");
  f("seal");
  var d = 0, k = function(a) {
    this.id_ = (d += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  k.prototype.set = function(a, b) {
    g(a);
    if (!$jscomp.owns(a, h)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[h][this.id_] = b;
    return this;
  };
  k.prototype.get = function(a) {
    return $jscomp.owns(a, h) ? a[h][this.id_] : void 0;
  };
  k.prototype.has = function(a) {
    return $jscomp.owns(a, h) && $jscomp.owns(a[h], this.id_);
  };
  k.prototype.delete = function(a) {
    return $jscomp.owns(a, h) && $jscomp.owns(a[h], this.id_) ? delete a[h][this.id_] : !1;
  };
  return k;
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
      var d = b.entries(), g = d.next();
      if (g.done || g.value[0] != c || "s" != g.value[1]) {
        return !1;
      }
      g = d.next();
      return g.done || 4 != g.value[0].x || "t" != g.value[1] || !d.next().done ? !1 : !0;
    } catch (p) {
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
  var e = new WeakMap, g = function(a) {
    this.data_ = {};
    this.head_ = d();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  g.prototype.set = function(a, b) {
    a = 0 === a ? 0 : a;
    var c = f(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  g.prototype.delete = function(a) {
    a = f(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  g.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = d();
    this.size = 0;
  };
  g.prototype.has = function(a) {
    return !!f(this, a).entry;
  };
  g.prototype.get = function(a) {
    return (a = f(this, a).entry) && a.value;
  };
  g.prototype.entries = function() {
    return h(this, function(a) {
      return [a.key, a.value];
    });
  };
  g.prototype.keys = function() {
    return h(this, function(a) {
      return a.key;
    });
  };
  g.prototype.values = function() {
    return h(this, function(a) {
      return a.value;
    });
  };
  g.prototype.forEach = function(a, b) {
    for (var d = this.entries(), c; !(c = d.next()).done;) {
      c = c.value, a.call(b, c[1], c[0], this);
    }
  };
  g.prototype[Symbol.iterator] = g.prototype.entries;
  var f = function(a, b) {
    var d = b && typeof b;
    "object" == d || "function" == d ? e.has(b) ? d = e.get(b) : (d = "" + ++k, e.set(b, d)) : d = "p_" + b;
    var c = a.data_[d];
    if (c && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < c.length; a++) {
        var g = c[a];
        if (b !== b && g.key !== g.key || b === g.key) {
          return {id:d, list:c, index:a, entry:g};
        }
      }
    }
    return {id:d, list:c, index:-1, entry:void 0};
  }, h = function(a, b) {
    var d = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != a.head_;) {
          d = d.previous;
        }
        for (; d.next != d.head;) {
          return d = d.next, {done:!1, value:b(d)};
        }
        d = null;
      }
      return {done:!0, value:void 0};
    });
  }, d = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, k = 0;
  return g;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), f = new a($jscomp.makeIterator([b]));
      if (!f.has(b) || 1 != f.size || f.add(b) != f || 1 != f.size || f.add({x:4}) != f || 2 != f.size) {
        return !1;
      }
      var e = f.entries(), d = e.next();
      if (d.done || d.value[0] != b || d.value[1] != b) {
        return !1;
      }
      d = e.next();
      return d.done || d.value[0] == b || 4 != d.value[0].x || d.value[1] != d.value[0] ? !1 : e.next().done;
    } catch (k) {
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
  var e = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
    this.size = this.map_.size;
  };
  e.prototype.add = function(a) {
    a = 0 === a ? 0 : a;
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  e.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  e.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return this.map_.has(a);
  };
  e.prototype.entries = function() {
    return this.map_.entries();
  };
  e.prototype.values = function() {
    return this.map_.values();
  };
  e.prototype.keys = e.prototype.values;
  e.prototype[Symbol.iterator] = e.prototype.values;
  e.prototype.forEach = function(a, b) {
    var e = this;
    this.map_.forEach(function(d) {
      return a.call(b, d, d, e);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function e(a) {
    return a instanceof f ? a : new f(function(b, d) {
      b(a);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var b = this;
      this.asyncExecuteFunction(function() {
        b.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var g = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        a[b] = null;
        try {
          c();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var f = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject);
    } catch (c) {
      b.reject(c);
    }
  };
  f.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        c || (c = !0, a.call(b, d));
      };
    }
    var b = this, c = !1;
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
              var b = null != a;
              break a;
            case "function":
              b = !0;
              break a;
            default:
              b = !1;
          }
        }
        b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  f.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (c) {
      this.reject_(c);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  f.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  f.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  f.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  f.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        h.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new b;
  f.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  f.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (l) {
      c.reject(l);
    }
  };
  f.prototype.then = function(a, b) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          d(a(b));
        } catch (m) {
          e(m);
        }
      } : b;
    }
    var d, e, g = new f(function(a, b) {
      d = a;
      e = b;
    });
    this.callWhenSettled_(c(a, d), c(b, e));
    return g;
  };
  f.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  f.prototype.callWhenSettled_ = function(a, b) {
    function c() {
      switch(d.state_) {
        case 1:
          a(d.result_);
          break;
        case 2:
          b(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? h.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  f.resolve = e;
  f.reject = function(a) {
    return new f(function(b, c) {
      c(a);
    });
  };
  f.race = function(a) {
    return new f(function(b, c) {
      for (var d = $jscomp.makeIterator(a), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(b, c);
      }
    });
  };
  f.all = function(a) {
    var b = $jscomp.makeIterator(a), c = b.next();
    return c.done ? e([]) : new f(function(a, d) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, e(c.value).callWhenSettled_(f(g.length - 1), d), c = b.next();
      } while (!c.done);
    });
  };
  return f;
}, "es6", "es3");
module.exports = function() {
  var a = !0;
  $jscomp.initSymbol();
  var b = Symbol.toStringTag;
  [[String, "String Iterator"], [Array, "Array Iterator"], [Map, "Map Iterator"], [Set, "Set Iterator"]].forEach(function(e) {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var g = Object.getPrototypeOf((new e[0])[Symbol.iterator]());
    a = a && g.hasOwnProperty(b) && g[b] === e[1];
  });
  $jscomp.initSymbol();
  $jscomp.initSymbol();
  return a = a && "GeneratorFunction" === Object.getPrototypeOf(function g() {
    return $jscomp.generator.createGenerator(g, function(a) {
      a.jumpToEnd();
    });
  })[b] && "Generator" === Object.getPrototypeOf(function f() {
    return $jscomp.generator.createGenerator(f, function(a) {
      a.jumpToEnd();
    });
  }())[b] && "Map" === Map.prototype[b] && "Set" === Set.prototype[b] && "ArrayBuffer" === ArrayBuffer.prototype[b] && "DataView" === DataView.prototype[b] && "Promise" === Promise.prototype[b] && "Symbol" === Symbol.prototype[b] && "function" === typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get;
};

