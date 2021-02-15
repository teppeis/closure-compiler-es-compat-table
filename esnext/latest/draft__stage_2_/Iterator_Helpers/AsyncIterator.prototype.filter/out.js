var $jscomp = $jscomp || {};
$jscomp.scope = {};
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
$jscomp.polyfill = function(a, b, d, f) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, f) : $jscomp.polyfillUnisolated(a, b, d, f));
};
$jscomp.polyfillUnisolated = function(a, b, d, f) {
  d = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var e = a[f];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  a = a[a.length - 1];
  f = d[a];
  b = b(f);
  b != f && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, f) {
  var e = a.split(".");
  a = 1 === e.length;
  f = e[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < e.length - 1; l++) {
    var c = e[l];
    if (!(c in f)) {
      return;
    }
    f = f[c];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? f[e] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== d && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(f, e, {configurable:!0, writable:!0, value:b})));
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
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
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
    var f = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(f);
    if (!f.done) {
      return this.context_.stop_(), f;
    }
    var e = f.value;
  } catch (l) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(l), this.nextStep_();
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
  function b(f) {
    return a.next(f);
  }
  function d(f) {
    return a.throw(f);
  }
  return new Promise(function(f, e) {
    function l(c) {
      c.done ? f(c.value) : Promise.resolve(c.value).then(b, d).then(l, e);
    }
    l(a.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(a) {
  return $jscomp.asyncExecutePromiseGenerator(a());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(a) {
  return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(e, l) {
    this.$jscomp$symbol$id_ = e;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:l});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = 0, f = function(e) {
    if (this instanceof f) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (e || "") + "_" + d++, e);
  };
  return f;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
    var f = $jscomp.global[b[d]];
    "function" === typeof f && "function" != typeof f.prototype[a] && $jscomp.defineProperty(f.prototype, a, {configurable:!0, writable:!0, value:function() {
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
$jscomp.AsyncGeneratorWrapper$ActionEnum = {YIELD_VALUE:0, YIELD_STAR:1, AWAIT_VALUE:2, };
$jscomp.AsyncGeneratorWrapper$ActionRecord = function(a, b) {
  this.action = a;
  this.value = b;
};
$jscomp.AsyncGeneratorWrapper$GeneratorMethod = {NEXT:"next", THROW:"throw", RETURN:"return", };
$jscomp.AsyncGeneratorWrapper$ExecutionFrame_ = function(a, b, d, f) {
  this.method = a;
  this.param = b;
  this.resolve = d;
  this.reject = f;
};
$jscomp.AsyncGeneratorWrapper$ExecutionNode_ = function(a, b) {
  this.frame = a;
  this.next = b;
};
$jscomp.AsyncGeneratorWrapper$ExecutionQueue_ = function() {
  this.tail_ = this.head_ = null;
};
$jscomp.AsyncGeneratorWrapper$ExecutionQueue_.prototype.isEmpty = function() {
  return null === this.head_;
};
$jscomp.AsyncGeneratorWrapper$ExecutionQueue_.prototype.first = function() {
  if (this.head_) {
    return this.head_.frame;
  }
  throw Error("no frames in executionQueue");
};
$jscomp.AsyncGeneratorWrapper$ExecutionQueue_.prototype.drop = function() {
  this.head_ && (this.head_ = this.head_.next, this.head_ || (this.tail_ = null));
};
$jscomp.AsyncGeneratorWrapper$ExecutionQueue_.prototype.enqueue = function(a) {
  a = new $jscomp.AsyncGeneratorWrapper$ExecutionNode_(a, null);
  this.tail_ ? this.tail_.next = a : this.head_ = a;
  this.tail_ = a;
};
$jscomp.AsyncGeneratorWrapper = function(a) {
  this.generator_ = a;
  this.delegate_ = null;
  this.executionQueue_ = new $jscomp.AsyncGeneratorWrapper$ExecutionQueue_;
  this[Symbol.asyncIterator] = function() {
    return this;
  };
  var b = this;
  this.boundHandleDelegateResult_ = function(d) {
    b.handleDelegateResult_(d);
  };
  this.boundHandleDelegateError_ = function(d) {
    b.handleDelegateError_(d);
  };
  this.boundRejectAndClose_ = function(d) {
    b.rejectAndClose_(d);
  };
};
$jscomp.AsyncGeneratorWrapper.prototype.enqueueMethod_ = function(a, b) {
  var d = this;
  return new Promise(function(f, e) {
    var l = d.executionQueue_.isEmpty();
    d.executionQueue_.enqueue(new $jscomp.AsyncGeneratorWrapper$ExecutionFrame_(a, b, f, e));
    l && d.runFrame_();
  });
};
$jscomp.AsyncGeneratorWrapper.prototype.next = function(a) {
  return this.enqueueMethod_($jscomp.AsyncGeneratorWrapper$GeneratorMethod.NEXT, a);
};
$jscomp.AsyncGeneratorWrapper.prototype.return = function(a) {
  return this.enqueueMethod_($jscomp.AsyncGeneratorWrapper$GeneratorMethod.RETURN, new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, a));
};
$jscomp.AsyncGeneratorWrapper.prototype.throw = function(a) {
  return this.enqueueMethod_($jscomp.AsyncGeneratorWrapper$GeneratorMethod.THROW, a);
};
$jscomp.AsyncGeneratorWrapper.prototype.runFrame_ = function() {
  if (!this.executionQueue_.isEmpty()) {
    try {
      this.delegate_ ? this.runDelegateFrame_() : this.runGeneratorFrame_();
    } catch (a) {
      this.rejectAndClose_(a);
    }
  }
};
$jscomp.AsyncGeneratorWrapper.prototype.runGeneratorFrame_ = function() {
  var a = this, b = this.executionQueue_.first();
  try {
    var d = this.generator_[b.method](b.param);
    if (d.value instanceof $jscomp.AsyncGeneratorWrapper$ActionRecord) {
      switch(d.value.action) {
        case $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE:
          Promise.resolve(d.value.value).then(function(f) {
            b.resolve({value:f, done:d.done});
            a.executionQueue_.drop();
            a.runFrame_();
          }, function(f) {
            b.reject(f);
            a.executionQueue_.drop();
            a.runFrame_();
          }).catch(this.boundRejectAndClose_);
          break;
        case $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR:
          a.delegate_ = $jscomp.makeAsyncIterator(d.value.value);
          b.method = $jscomp.AsyncGeneratorWrapper$GeneratorMethod.NEXT;
          b.param = void 0;
          a.runFrame_();
          break;
        case $jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE:
          Promise.resolve(d.value.value).then(function(f) {
            b.method = $jscomp.AsyncGeneratorWrapper$GeneratorMethod.NEXT;
            b.param = f;
            a.runFrame_();
          }, function(f) {
            b.method = $jscomp.AsyncGeneratorWrapper$GeneratorMethod.THROW;
            b.param = f;
            a.runFrame_();
          }).catch(this.boundRejectAndClose_);
          break;
        default:
          throw Error("Unrecognized AsyncGeneratorWrapper$ActionEnum");
      }
    } else {
      b.resolve(d), a.executionQueue_.drop(), a.runFrame_();
    }
  } catch (f) {
    b.reject(f), a.executionQueue_.drop(), a.runFrame_();
  }
};
$jscomp.AsyncGeneratorWrapper.prototype.runDelegateFrame_ = function() {
  if (!this.delegate_) {
    throw Error("no delegate to perform execution");
  }
  var a = this.executionQueue_.first();
  if (a.method in this.delegate_) {
    try {
      this.delegate_[a.method](a.param).then(this.boundHandleDelegateResult_, this.boundHandleDelegateError_).catch(this.boundRejectAndClose_);
    } catch (b) {
      this.handleDelegateError_(b);
    }
  } else {
    this.delegate_ = null, this.runFrame_();
  }
};
$jscomp.AsyncGeneratorWrapper.prototype.handleDelegateResult_ = function(a) {
  var b = this.executionQueue_.first();
  !0 === a.done ? (this.delegate_ = null, b.method = $jscomp.AsyncGeneratorWrapper$GeneratorMethod.NEXT, b.param = a.value) : (b.resolve({value:a.value, done:!1}), this.executionQueue_.drop());
  this.runFrame_();
};
$jscomp.AsyncGeneratorWrapper.prototype.handleDelegateError_ = function(a) {
  var b = this.executionQueue_.first();
  this.delegate_ = null;
  b.method = $jscomp.AsyncGeneratorWrapper$GeneratorMethod.THROW;
  b.param = a;
  this.runFrame_();
};
$jscomp.AsyncGeneratorWrapper.prototype.rejectAndClose_ = function(a) {
  this.executionQueue_.isEmpty() || (this.executionQueue_.first().reject(a), this.executionQueue_.drop());
  this.delegate_ && "return" in this.delegate_ && (this.delegate_["return"](void 0), this.delegate_ = null);
  this.generator_["return"](void 0);
  this.runFrame_();
};
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function d(c) {
    return c instanceof e ? c : new e(function(g, h) {
      g(c);
    });
  }
  if (a && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return a;
  }
  b.prototype.asyncExecute = function(c) {
    if (null == this.batch_) {
      this.batch_ = [];
      var g = this;
      this.asyncExecuteFunction(function() {
        g.executeBatch_();
      });
    }
    this.batch_.push(c);
  };
  var f = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(c) {
    f(c, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var c = this.batch_;
      this.batch_ = [];
      for (var g = 0; g < c.length; ++g) {
        var h = c[g];
        c[g] = null;
        try {
          h();
        } catch (k) {
          this.asyncThrow_(k);
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
    var g = this.createResolveAndReject_();
    try {
      c(g.resolve, g.reject);
    } catch (h) {
      g.reject(h);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function c(k) {
      return function(m) {
        h || (h = !0, k.call(g, m));
      };
    }
    var g = this, h = !1;
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
              var g = null != c;
              break a;
            case "function":
              g = !0;
              break a;
            default:
              g = !1;
          }
        }
        g ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c);
      }
    }
  };
  e.prototype.resolveToNonPromiseObj_ = function(c) {
    var g = void 0;
    try {
      g = c.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof g ? this.settleSameAsThenable_(g, c) : this.fulfill_(c);
  };
  e.prototype.reject_ = function(c) {
    this.settle_(2, c);
  };
  e.prototype.fulfill_ = function(c) {
    this.settle_(1, c);
  };
  e.prototype.settle_ = function(c, g) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + c + ", " + g + "): Promise already settled in state" + this.state_);
    }
    this.state_ = c;
    this.result_ = g;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  e.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var c = this;
    f(function() {
      if (c.notifyUnhandledRejection_()) {
        var g = $jscomp.global.console;
        "undefined" !== typeof g && g.error(c.result_);
      }
    }, 1);
  };
  e.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var c = $jscomp.global.CustomEvent, g = $jscomp.global.Event, h = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof c ? c = new c("unhandledrejection", {cancelable:!0}) : "function" === typeof g ? c = new g("unhandledrejection", {cancelable:!0}) : (c = $jscomp.global.document.createEvent("CustomEvent"), c.initCustomEvent("unhandledrejection", !1, !0, c));
    c.promise = this;
    c.reason = this.result_;
    return h(c);
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var c = 0; c < this.onSettledCallbacks_.length; ++c) {
        l.asyncExecute(this.onSettledCallbacks_[c]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new b;
  e.prototype.settleSameAsPromise_ = function(c) {
    var g = this.createResolveAndReject_();
    c.callWhenSettled_(g.resolve, g.reject);
  };
  e.prototype.settleSameAsThenable_ = function(c, g) {
    var h = this.createResolveAndReject_();
    try {
      c.call(g, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  e.prototype.then = function(c, g) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var k, m, t = new e(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(h(c, k), h(g, m));
    return t;
  };
  e.prototype.catch = function(c) {
    return this.then(void 0, c);
  };
  e.prototype.callWhenSettled_ = function(c, g) {
    function h() {
      switch(k.state_) {
        case 1:
          c(k.result_);
          break;
        case 2:
          g(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  e.resolve = d;
  e.reject = function(c) {
    return new e(function(g, h) {
      h(c);
    });
  };
  e.race = function(c) {
    return new e(function(g, h) {
      for (var k = $jscomp.makeIterator(c), m = k.next(); !m.done; m = k.next()) {
        d(m.value).callWhenSettled_(g, h);
      }
    });
  };
  e.all = function(c) {
    var g = $jscomp.makeIterator(c), h = g.next();
    return h.done ? d([]) : new e(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, d(h.value).callWhenSettled_(t(n.length - 1), m), h = g.next();
      } while (!h.done);
    });
  };
  return e;
}, "es6", "es3");
module.exports = function(a) {
  (function(b) {
    var d, f, e, l;
    return $jscomp.asyncExecutePromiseGeneratorProgram(function(c) {
      switch(c.nextAddress) {
        case 1:
          d = [], f = $jscomp.makeAsyncIterator(b);
        case 2:
          return c.yield(f.next(), 5);
        case 5:
          e = c.yieldResult;
          if (e.done) {
            c.jumpTo(4);
            break;
          }
          l = e.value;
          d.push(l);
          c.jumpTo(2);
          break;
        case 4:
          return c.return(d);
      }
    });
  })(function() {
    return new $jscomp.AsyncGeneratorWrapper(function d() {
      return $jscomp.generator.createGenerator(d, function(f) {
        return f.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, [1, 2, 3]), 0);
      });
    }());
  }().filter(function(b) {
    return b % 2;
  })).then(function(b) {
    "1,3" === b.join() && a();
  });
};

