var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(d) {
  var e = 0;
  return function() {
    return e < d.length ? {done:!1, value:d[e++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(d) {
  return {next:$jscomp.arrayIteratorImpl(d)};
};
$jscomp.makeIterator = function(d) {
  var e = "undefined" != typeof Symbol && Symbol.iterator && d[Symbol.iterator];
  return e ? e.call(d) : $jscomp.arrayIterator(d);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.getGlobal = function(d) {
  d = ["object" == typeof globalThis && globalThis, d, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < d.length; ++e) {
    var f = d[e];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(d, e, f) {
  if (d == Array.prototype || d == Object.prototype) {
    return d;
  }
  d[e] = f.value;
  return d;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(d, e) {
  var f = $jscomp.propertyToPolyfillSymbol[e];
  if (null == f) {
    return d[e];
  }
  f = d[f];
  return void 0 !== f ? f : d[e];
};
$jscomp.polyfill = function(d, e, f, h) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(d, e, f, h) : $jscomp.polyfillUnisolated(d, e, f, h));
};
$jscomp.polyfillUnisolated = function(d, e, f, h) {
  f = $jscomp.global;
  d = d.split(".");
  for (h = 0; h < d.length - 1; h++) {
    var b = d[h];
    if (!(b in f)) {
      return;
    }
    f = f[b];
  }
  d = d[d.length - 1];
  h = f[d];
  e = e(h);
  e != h && null != e && $jscomp.defineProperty(f, d, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(d, e, f, h) {
  var b = d.split(".");
  d = 1 === b.length;
  h = b[0];
  h = !d && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < b.length - 1; l++) {
    var a = b[l];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  b = b[b.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? h[b] : null;
  e = e(f);
  null != e && (d ? $jscomp.defineProperty($jscomp.polyfills, b, {configurable:!0, writable:!0, value:e}) : e !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[b] && (f = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[b] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(b) : $jscomp.POLYFILL_PREFIX + f + "$" + b), b = $jscomp.propertyToPolyfillSymbol[b], $jscomp.defineProperty(h, b, {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("Promise", function(d) {
  function e() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof b ? a : new b(function(c, g) {
      c(a);
    });
  }
  if (d && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return d;
  }
  e.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var c = this;
      this.asyncExecuteFunction(function() {
        c.executeBatch_();
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
      for (var c = 0; c < a.length; ++c) {
        var g = a[c];
        a[c] = null;
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
  var b = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var c = this.createResolveAndReject_();
    try {
      a(c.resolve, c.reject);
    } catch (g) {
      c.reject(g);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(m) {
        g || (g = !0, k.call(c, m));
      };
    }
    var c = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  b.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var c = null != a;
              break a;
            case "function":
              c = !0;
              break a;
            default:
              c = !1;
          }
        }
        c ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var c = void 0;
    try {
      c = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a);
  };
  b.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  b.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  b.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  b.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var c = $jscomp.global.console;
        "undefined" !== typeof c && c.error(a.result_);
      }
    }, 1);
  };
  b.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var a = $jscomp.global.CustomEvent, c = $jscomp.global.Event, g = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof g) {
      return !0;
    }
    "function" === typeof a ? a = new a("unhandledrejection", {cancelable:!0}) : "function" === typeof c ? a = new c("unhandledrejection", {cancelable:!0}) : (a = $jscomp.global.document.createEvent("CustomEvent"), a.initCustomEvent("unhandledrejection", !1, !0, a));
    a.promise = this;
    a.reason = this.result_;
    return g(a);
  };
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new e;
  b.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, c) {
    var g = this.createResolveAndReject_();
    try {
      a.call(c, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  b.prototype.then = function(a, c) {
    function g(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var k, m, t = new b(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(g(a, k), g(c, m));
    return t;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.callWhenSettled_ = function(a, c) {
    function g() {
      switch(k.state_) {
        case 1:
          a(k.result_);
          break;
        case 2:
          c(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(c, g) {
      g(a);
    });
  };
  b.race = function(a) {
    return new b(function(c, g) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        f(m.value).callWhenSettled_(c, g);
      }
    });
  };
  b.all = function(a) {
    var c = $jscomp.makeIterator(a), g = c.next();
    return g.done ? f([]) : new b(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, f(g.value).callWhenSettled_(t(n.length - 1), m), g = c.next();
      } while (!g.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function(d) {
  function e(a) {
    l += "quux" === a;
    4 === l && d();
  }
  function f(a) {
    l = -Infinity;
  }
  var h = new Promise(function(a, c) {
    a("foo");
  }), b = new Promise(function(a, c) {
    c("quux");
  }), l = 0;
  h.then(function(a) {
    l += "foo" === a;
    4 === l && d();
  }, f);
  b.then(f, e);
  h.catch(f);
  b.catch(e);
  h.then(function() {
    l += h.then() !== h;
    4 === l && d();
  });
};

