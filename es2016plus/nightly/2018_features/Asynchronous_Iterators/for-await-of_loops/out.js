var $jscomp = $jscomp || {};
$jscomp.scope = {};
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
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var d = $jscomp.propertyToPolyfillSymbol[b];
  if (null == d) {
    return a[b];
  }
  d = a[d];
  return void 0 !== d ? d : a[b];
};
$jscomp.polyfill = function(a, b, d, g) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, g) : $jscomp.polyfillUnisolated(a, b, d, g));
};
$jscomp.polyfillUnisolated = function(a, b, d, g) {
  d = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var e = a[g];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  a = a[a.length - 1];
  g = d[a];
  b = b(g);
  b != g && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, g) {
  var e = a.split(".");
  a = 1 === e.length;
  g = e[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var k = 0; k < e.length - 1; k++) {
    var c = e[k];
    if (!(c in g)) {
      return;
    }
    g = g[c];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? g[e] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (d = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + d + "$" + e), e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(g, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(k, c) {
    this.$jscomp$symbol$id_ = k;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", g = 0, e = function(k) {
    if (this instanceof e) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b(d + (k || "") + "_" + g++, k);
  };
  return e;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
    var g = $jscomp.global[b[d]];
    "function" === typeof g && "function" != typeof g.prototype[a] && $jscomp.defineProperty(g.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.polyfill("Symbol.asyncIterator", function(a) {
  return a ? a : Symbol("Symbol.asyncIterator");
}, "es9", "es3");
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (d) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
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
  var d = a.next();
  $jscomp.generator.ensureIteratorResultIsObject_(d);
  if (d.done) {
    this.yieldResult = d.value, this.nextAddress = b;
  } else {
    return this.yieldAllIterator_ = a, this.yield(d.value, b);
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
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, d) {
  d ? this.finallyContexts_[d] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
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
    return this.yieldAllStep_("return" in b ? b["return"] : function(d) {
      return {value:d, done:!0};
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
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, d) {
  try {
    var g = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(g);
    if (!g.done) {
      return this.context_.stop_(), g;
    }
    var e = g.value;
  } catch (k) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(k), this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  d.call(this.context_, e);
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
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(a, b) {
  b = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
  $jscomp.setPrototypeOf && a.prototype && $jscomp.setPrototypeOf(b, a.prototype);
  return b;
};
$jscomp.asyncExecutePromiseGenerator = function(a) {
  function b(g) {
    return a.next(g);
  }
  function d(g) {
    return a.throw(g);
  }
  return new Promise(function(g, e) {
    function k(c) {
      c.done ? g(c.value) : Promise.resolve(c.value).then(b, d).then(k, e);
    }
    k(a.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(a) {
  return $jscomp.asyncExecutePromiseGenerator(a());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(a) {
  return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)));
};
$jscomp.makeAsyncIterator = function(a) {
  var b = a[Symbol.asyncIterator];
  return void 0 !== b ? b.call(a) : new $jscomp.AsyncIteratorFromSyncWrapper($jscomp.makeIterator(a));
};
$jscomp.AsyncIteratorFromSyncWrapper = function(a) {
  this[Symbol.asyncIterator] = function() {
    return this;
  };
  this[Symbol.iterator] = function() {
    return a;
  };
  this.next = function(b) {
    return Promise.resolve(a.next(b));
  };
  void 0 !== a["throw"] && (this["throw"] = function(b) {
    return Promise.resolve(a["throw"](b));
  });
  void 0 !== a["return"] && (this["return"] = function(b) {
    return Promise.resolve(a["return"](b));
  });
};
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function d(c) {
    return c instanceof e ? c : new e(function(f, h) {
      f(c);
    });
  }
  if (a && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return a;
  }
  b.prototype.asyncExecute = function(c) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
      });
    }
    this.batch_.push(c);
  };
  var g = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(c) {
    g(c, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var c = this.batch_;
      this.batch_ = [];
      for (var f = 0; f < c.length; ++f) {
        var h = c[f];
        c[f] = null;
        try {
          h();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(c) {
    this.asyncExecuteFunction(function() {
      throw c;
    });
  };
  var e = function(c) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var f = this.createResolveAndReject_();
    try {
      c(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function c(l) {
      return function(m) {
        h || (h = !0, l.call(f, m));
      };
    }
    var f = this, h = !1;
    return {resolve:c(this.resolveTo_), reject:c(this.reject_)};
  };
  e.prototype.resolveTo_ = function(c) {
    if (c === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (c instanceof e) {
        this.settleSameAsPromise_(c);
      } else {
        a: {
          switch(typeof c) {
            case "object":
              var f = null != c;
              break a;
            case "function":
              f = !0;
              break a;
            default:
              f = !1;
          }
        }
        f ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c);
      }
    }
  };
  e.prototype.resolveToNonPromiseObj_ = function(c) {
    var f = void 0;
    try {
      f = c.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, c) : this.fulfill_(c);
  };
  e.prototype.reject_ = function(c) {
    this.settle_(2, c);
  };
  e.prototype.fulfill_ = function(c) {
    this.settle_(1, c);
  };
  e.prototype.settle_ = function(c, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + c + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = c;
    this.result_ = f;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  e.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var c = this;
    g(function() {
      if (c.notifyUnhandledRejection_()) {
        var f = $jscomp.global.console;
        "undefined" !== typeof f && f.error(c.result_);
      }
    }, 1);
  };
  e.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var c = $jscomp.global.CustomEvent, f = $jscomp.global.Event, h = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof c ? c = new c("unhandledrejection", {cancelable:!0}) : "function" === typeof f ? c = new f("unhandledrejection", {cancelable:!0}) : (c = $jscomp.global.document.createEvent("CustomEvent"), c.initCustomEvent("unhandledrejection", !1, !0, c));
    c.promise = this;
    c.reason = this.result_;
    return h(c);
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var c = 0; c < this.onSettledCallbacks_.length; ++c) {
        k.asyncExecute(this.onSettledCallbacks_[c]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var k = new b;
  e.prototype.settleSameAsPromise_ = function(c) {
    var f = this.createResolveAndReject_();
    c.callWhenSettled_(f.resolve, f.reject);
  };
  e.prototype.settleSameAsThenable_ = function(c, f) {
    var h = this.createResolveAndReject_();
    try {
      c.call(f, h.resolve, h.reject);
    } catch (l) {
      h.reject(l);
    }
  };
  e.prototype.then = function(c, f) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          l(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var l, m, t = new e(function(n, p) {
      l = n;
      m = p;
    });
    this.callWhenSettled_(h(c, l), h(f, m));
    return t;
  };
  e.prototype.catch = function(c) {
    return this.then(void 0, c);
  };
  e.prototype.callWhenSettled_ = function(c, f) {
    function h() {
      switch(l.state_) {
        case 1:
          c(l.result_);
          break;
        case 2:
          f(l.result_);
          break;
        default:
          throw Error("Unexpected state: " + l.state_);
      }
    }
    var l = this;
    null == this.onSettledCallbacks_ ? k.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  e.resolve = d;
  e.reject = function(c) {
    return new e(function(f, h) {
      h(c);
    });
  };
  e.race = function(c) {
    return new e(function(f, h) {
      for (var l = $jscomp.makeIterator(c), m = l.next(); !m.done; m = l.next()) {
        d(m.value).callWhenSettled_(f, h);
      }
    });
  };
  e.all = function(c) {
    var f = $jscomp.makeIterator(c), h = f.next();
    return h.done ? d([]) : new e(function(l, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && l(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, d(h.value).callWhenSettled_(t(n.length - 1), m), h = f.next();
      } while (!h.done);
    });
  };
  return e;
}, "es6", "es3");
module.exports = function(a) {
  var b = {};
  b[Symbol.asyncIterator] = function() {
    var d = 0;
    return {next:function() {
      switch(++d) {
        case 1:
          return Promise.resolve({done:!1, value:"a"});
        case 2:
          return Promise.resolve({done:!1, value:"b"});
      }
      return Promise.resolve({done:!0});
    }};
  };
  (function() {
    var d, g, e, k;
    return $jscomp.asyncExecutePromiseGeneratorProgram(function(c) {
      switch(c.nextAddress) {
        case 1:
          d = "", g = $jscomp.makeAsyncIterator(b);
        case 2:
          return c.yield(g.next(), 5);
        case 5:
          e = c.yieldResult;
          if (e.done) {
            c.jumpTo(4);
            break;
          }
          k = e.value;
          d += k;
          c.jumpTo(2);
          break;
        case 4:
          "ab" === d && a(), c.jumpToEnd();
      }
    });
  })();
};

