var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var e = 0;
  return function() {
    return e < c.length ? {done:!1, value:c[e++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(c) {
  return {next:$jscomp.arrayIteratorImpl(c)};
};
$jscomp.makeIterator = function(c) {
  var e = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
  return e ? e.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.getGlobal = function(c) {
  c = ["object" == typeof globalThis && globalThis, c, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < c.length; ++e) {
    var f = c[e];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, e, f) {
  if (c == Array.prototype || c == Object.prototype) {
    return c;
  }
  c[e] = f.value;
  return c;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(c, e) {
  var f = $jscomp.propertyToPolyfillSymbol[e];
  if (null == f) {
    return c[e];
  }
  f = c[f];
  return void 0 !== f ? f : c[e];
};
$jscomp.polyfill = function(c, e, f, h) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(c, e, f, h) : $jscomp.polyfillUnisolated(c, e, f, h));
};
$jscomp.polyfillUnisolated = function(c, e, f, h) {
  f = $jscomp.global;
  c = c.split(".");
  for (h = 0; h < c.length - 1; h++) {
    var d = c[h];
    if (!(d in f)) {
      return;
    }
    f = f[d];
  }
  c = c[c.length - 1];
  h = f[c];
  e = e(h);
  e != h && null != e && $jscomp.defineProperty(f, c, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(c, e, f, h) {
  var d = c.split(".");
  c = 1 === d.length;
  h = d[0];
  h = !c && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var p = 0; p < d.length - 1; p++) {
    var a = d[p];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  d = d[d.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? h[d] : null;
  e = e(f);
  null != e && (c ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:e}) : e !== f && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(h, d, {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("Promise", function(c) {
  function e() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof d ? a : new d(function(b, g) {
      b(a);
    });
  }
  if (c && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return c;
  }
  e.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var b = this;
      this.asyncExecuteFunction(function() {
        b.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var h = $jscomp.global.setTimeout;
  e.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  e.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var b = 0; b < a.length; ++b) {
        var g = a[b];
        a[b] = null;
        try {
          g();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  e.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var d = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject);
    } catch (g) {
      b.reject(g);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(b, l));
      };
    }
    var b = this, g = !1;
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
    } catch (g) {
      this.reject_(g);
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
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  d.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var b = $jscomp.global.console;
        "undefined" !== typeof b && b.error(a.result_);
      }
    }, 1);
  };
  d.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var a = $jscomp.global.CustomEvent, b = $jscomp.global.Event, g = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof g) {
      return !0;
    }
    "function" === typeof a ? a = new a("unhandledrejection", {cancelable:!0}) : "function" === typeof b ? a = new b("unhandledrejection", {cancelable:!0}) : (a = $jscomp.global.document.createEvent("CustomEvent"), a.initCustomEvent("unhandledrejection", !1, !0, a));
    a.promise = this;
    a.reason = this.result_;
    return g(a);
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        p.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new e;
  d.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, b) {
    var g = this.createResolveAndReject_();
    try {
      a.call(b, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  d.prototype.then = function(a, b) {
    function g(m, n) {
      return "function" == typeof m ? function(q) {
        try {
          k(m(q));
        } catch (r) {
          l(r);
        }
      } : n;
    }
    var k, l, t = new d(function(m, n) {
      k = m;
      l = n;
    });
    this.callWhenSettled_(g(a, k), g(b, l));
    return t;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, b) {
    function g() {
      switch(k.state_) {
        case 1:
          a(k.result_);
          break;
        case 2:
          b(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? p.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  d.resolve = f;
  d.reject = function(a) {
    return new d(function(b, g) {
      g(a);
    });
  };
  d.race = function(a) {
    return new d(function(b, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        f(l.value).callWhenSettled_(b, g);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), g = b.next();
    return g.done ? f([]) : new d(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, f(g.value).callWhenSettled_(t(m.length - 1), l), g = b.next();
      } while (!g.done);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  new Promise(function() {
  });
  try {
    Promise.prototype.then(function() {
    });
  } catch (c) {
    return !0;
  }
};

