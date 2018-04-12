var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(c, e, d) {
      return c == a && "q" == e && d == b;
    }}));
    return !0 === b.q;
  } catch (c) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(b) {
    return $jscomp.SYMBOL_PREFIX + (b || "") + a++;
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
  var b = 0;
  return $jscomp.iteratorPrototype(function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
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
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill = function(a, b, c, e) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in c || (c[d] = {});
      c = c[d];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), c = Object.seal({}), d = new a([[b, 2], [c, 3]]);
      if (2 != d.get(b) || 3 != d.get(c)) {
        return !1;
      }
      d.delete(b);
      d.set(c, 4);
      return !d.has(b) && 4 == d.get(c);
    } catch (n) {
      return !1;
    }
  }
  function c(a) {
    $jscomp.owns(a, d) || $jscomp.defineProperty(a, d, {value:{}});
  }
  function e(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      c(a);
      return b(a);
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
  var d = "$jscomp_hidden_" + Math.random();
  e("freeze");
  e("preventExtensions");
  e("seal");
  var g = 0, f = function(a) {
    this.id_ = (g += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  f.prototype.set = function(a, b) {
    c(a);
    if (!$jscomp.owns(a, d)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[d][this.id_] = b;
    return this;
  };
  f.prototype.get = function(a) {
    return $jscomp.owns(a, d) ? a[d][this.id_] : void 0;
  };
  f.prototype.has = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_);
  };
  f.prototype.delete = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_) ? delete a[d][this.id_] : !1;
  };
  return f;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var d = c.entries(), f = d.next();
      if (f.done || f.value[0] != b || "s" != f.value[1]) {
        return !1;
      }
      f = d.next();
      return f.done || 4 != f.value[0].x || "t" != f.value[1] || !d.next().done ? !1 : !0;
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
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var c = new WeakMap, e = function(a) {
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
  e.prototype.set = function(a, b) {
    var c = d(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    a = d(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!d(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = d(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  e.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  e.prototype.values = function() {
    return g(this, function(a) {
      return a.value;
    });
  };
  e.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var d = function(a, b) {
    var d = b && typeof b;
    "object" == d || "function" == d ? c.has(b) ? d = c.get(b) : (d = "" + ++l, c.set(b, d)) : d = "p_" + b;
    var f = a.data_[d];
    if (f && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < f.length; a++) {
        var e = f[a];
        if (b !== b && e.key !== e.key || b === e.key) {
          return {id:d, list:f, index:a, entry:e};
        }
      }
    }
    return {id:d, list:f, index:-1, entry:void 0};
  }, g = function(a, b) {
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
  return e;
}, "es6", "es3");
$jscomp.iteratorFromArray = function(a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0, e = {next:function() {
    if (c < a.length) {
      var d = c++;
      return {value:b(d, a[d]), done:!1};
    }
    e.next = function() {
      return {done:!0, value:void 0};
    };
    return e.next();
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
};
$jscomp.polyfill("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, c) {
      return [a, c];
    });
  };
}, "es6", "es3");
$jscomp.findInternal = function(a, b, c) {
  a instanceof String && (a = String(a));
  for (var e = a.length, d = 0; d < e; d++) {
    var g = a[d];
    if (b.call(c, g, d, a)) {
      return {i:d, v:g};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, c, e) {
    $jscomp.initSymbolIterator();
    c = null != c ? c : function(a) {
      return a;
    };
    var b = [], g = a[Symbol.iterator];
    if ("function" == typeof g) {
      for (a = g.call(a); !(g = a.next()).done;) {
        b.push(c.call(e, g.value));
      }
    } else {
      g = a.length;
      for (var f = 0; f < g; f++) {
        b.push(c.call(e, a[f]));
      }
    }
    return b;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(a, c) {
    return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, c) {
      return c;
    });
  };
}, "es8", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function c(a) {
    return a instanceof d ? a : new d(function(b, c) {
      b(a);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(a) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this;
  };
  b.prototype.asyncExecuteBatch_ = function() {
    var a = this;
    this.asyncExecuteFunction(function() {
      a.executeBatch_();
    });
  };
  var e = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(a) {
    e(a, 0);
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
        } catch (k) {
          this.asyncThrow_(k);
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
  var d = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject);
    } catch (h) {
      b.reject(h);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        c || (c = !0, a.call(b, d));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  d.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof d) {
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
  d.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        g.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new b;
  d.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  d.prototype.then = function(a, b) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var e, f, g = new d(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(c(a, e), c(b, f));
    return g;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, b) {
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
    null == this.onSettledCallbacks_ ? g.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  d.resolve = c;
  d.reject = function(a) {
    return new d(function(b, c) {
      c(a);
    });
  };
  d.race = function(a) {
    return new d(function(b, d) {
      for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f = e.next()) {
        c(f.value).callWhenSettled_(b, d);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), e = b.next();
    return e.done ? c([]) : new d(function(a, d) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, c(e.value).callWhenSettled_(f(g.length - 1), d), e = b.next();
      } while (!e.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.asyncExecutePromiseGenerator = function(a) {
  function b(b) {
    return a.next(b);
  }
  function c(b) {
    return a.throw(b);
  }
  return new Promise(function(e, d) {
    function g(a) {
      a.done ? e(a.value) : Promise.resolve(a.value).then(b, c).then(g, d);
    }
    g(a.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(a) {
  return $jscomp.asyncExecutePromiseGenerator(a());
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
  var c = a.next();
  $jscomp.generator.ensureIteratorResultIsObject_(c);
  if (c.done) {
    this.yieldResult = c.value, this.nextAddress = b;
  } else {
    return this.yieldAllIterator_ = a, this.yield(c.value, b);
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
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, c) {
  c ? this.finallyContexts_[c] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
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
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, c) {
  try {
    var e = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(e);
    if (!e.done) {
      return this.context_.stop_(), e;
    }
    var d = e.value;
  } catch (g) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(g), this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  c.call(this.context_, d);
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
  $jscomp.generator.Generator_.prototype = a.prototype;
  return new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
};
$jscomp.polyfill("Math.log1p", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    if (0.25 > a && -0.25 < a) {
      for (var b = a, e = 1, d = a, g = 0, f = 1; g != d;) {
        b *= a, f *= -1, d = (g = d) + f * b / ++e;
      }
      return d;
    }
    return Math.log(1 + a);
  };
}, "es6", "es3");
$jscomp.polyfill("Number.MAX_SAFE_INTEGER", function() {
  return 9007199254740991;
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function(a) {
  return a ? a : function(a) {
    return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a;
  };
}, "es6", "es3");
$jscomp.polyfill("Number.isInteger", function(a) {
  return a ? a : function(a) {
    return Number.isFinite(a) ? a === Math.floor(a) : !1;
  };
}, "es6", "es3");
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var e = arguments[c];
    if (e) {
      for (var d in e) {
        $jscomp.owns(e, d) && (a[d] = e[d]);
      }
    }
  }
  return a;
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var b = [], e = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var d = 0; d < e.length; d++) {
      ("jscomp_symbol_" == e[d].substring(0, 14) ? a : b).push(e[d]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (c) {
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
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.construct = function() {
  function a() {
    function a() {
    }
    new a;
    Reflect.construct(a, [], function() {
    });
    return new a instanceof a;
  }
  if ("undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var b = Reflect.construct;
    return function(a, e, d) {
      a = b(a, e);
      d && Reflect.setPrototypeOf(a, d.prototype);
      return a;
    };
  }
  return function(a, b, d) {
    void 0 === d && (d = a);
    d = $jscomp.objectCreate(d.prototype || Object.prototype);
    return Function.prototype.apply.call(a, d, b) || d;
  };
}();
$jscomp.polyfill("Reflect.getOwnPropertyDescriptor", function(a) {
  return a || Object.getOwnPropertyDescriptor;
}, "es6", "es5");
$jscomp.polyfill("Reflect.getPrototypeOf", function(a) {
  return a || Object.getPrototypeOf;
}, "es6", "es5");
$jscomp.findDescriptor = function(a, b) {
  for (; a;) {
    var c = Reflect.getOwnPropertyDescriptor(a, b);
    if (c) {
      return c;
    }
    a = Reflect.getPrototypeOf(a);
  }
};
$jscomp.polyfill("Reflect.isExtensible", function(a) {
  return a ? a : $jscomp.ASSUME_ES5 || "function" == typeof Object.isExtensible ? Object.isExtensible : function() {
    return !0;
  };
}, "es6", "es3");
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
  return a ? a : function(a) {
    var b = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > a || 1342177279 < a) {
      throw new RangeError("Invalid count value");
    }
    a |= 0;
    for (var e = ""; a;) {
      if (a & 1 && (e += b), a >>>= 1) {
        b += b;
      }
    }
    return e;
  };
}, "es6", "es3");
$jscomp.stringPadding = function(a, b) {
  a = void 0 !== a ? String(a) : " ";
  return 0 < b && a ? a.repeat(Math.ceil(b / a.length)).substring(0, b) : "";
};
$jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.inherits = function(a, b) {
  a.prototype = $jscomp.objectCreate(b.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    c(a, b);
  } else {
    for (c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var e = Object.getOwnPropertyDescriptor(b, c);
          e && Object.defineProperty(a, c, e);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
};
module.exports = function() {
  var a = Object.fromEntries(new Map([["foo", 42], ["bar", 23]]));
  return 42 === a.foo && 23 === a.bar;
};

