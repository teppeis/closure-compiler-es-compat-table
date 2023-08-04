var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  if (c) {
    return c.call(b);
  }
  if ("number" == typeof b.length) {
    return $jscomp.arrayIterator(b);
  }
  throw Error(String(b) + " is not an iterable or ArrayLike");
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < b.length; ++c) {
    var f = b[c];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, f) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = f.value;
  return b;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, c, f) {
  if (!f || null != b) {
    f = $jscomp.propertyToPolyfillSymbol[c];
    if (null == f) {
      return b[c];
    }
    f = b[f];
    return void 0 !== f ? f : b[c];
  }
};
$jscomp.polyfill = function(b, c, f, h) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, f, h) : $jscomp.polyfillUnisolated(b, c, f, h));
};
$jscomp.polyfillUnisolated = function(b, c, f, h) {
  f = $jscomp.global;
  b = b.split(".");
  for (h = 0; h < b.length - 1; h++) {
    var e = b[h];
    if (!(e in f)) {
      return;
    }
    f = f[e];
  }
  b = b[b.length - 1];
  h = f[b];
  c = c(h);
  c != h && null != c && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, f, h) {
  var e = b.split(".");
  b = 1 === e.length;
  h = e[0];
  h = !b && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var p = 0; p < e.length - 1; p++) {
    var a = e[p];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  e = e[e.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? h[e] : null;
  c = c(f);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (f = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + f + "$" + e), $jscomp.defineProperty(h, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Promise", function(b) {
  function c() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof e ? a : new e(function(d, g) {
      d(a);
    });
  }
  if (b && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return b;
  }
  c.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var d = this;
      this.asyncExecuteFunction(function() {
        d.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var h = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var d = 0; d < a.length; ++d) {
        var g = a[d];
        a[d] = null;
        try {
          g();
        } catch (k) {
          this.asyncThrow_(k);
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
  var e = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var d = this.createResolveAndReject_();
    try {
      a(d.resolve, d.reject);
    } catch (g) {
      d.reject(g);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(d, l));
      };
    }
    var d = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  e.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (a instanceof e) {
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
  };
  e.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
  };
  e.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  e.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  e.prototype.settle_ = function(a, d) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = d;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  e.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var d = $jscomp.global.console;
        "undefined" !== typeof d && d.error(a.result_);
      }
    }, 1);
  };
  e.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var a = $jscomp.global.CustomEvent, d = $jscomp.global.Event, g = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof g) {
      return !0;
    }
    "function" === typeof a ? a = new a("unhandledrejection", {cancelable:!0}) : "function" === typeof d ? a = new d("unhandledrejection", {cancelable:!0}) : (a = $jscomp.global.document.createEvent("CustomEvent"), a.initCustomEvent("unhandledrejection", !1, !0, a));
    a.promise = this;
    a.reason = this.result_;
    return g(a);
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        p.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new c();
  e.prototype.settleSameAsPromise_ = function(a) {
    var d = this.createResolveAndReject_();
    a.callWhenSettled_(d.resolve, d.reject);
  };
  e.prototype.settleSameAsThenable_ = function(a, d) {
    var g = this.createResolveAndReject_();
    try {
      a.call(d, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  e.prototype.then = function(a, d) {
    function g(m, n) {
      return "function" == typeof m ? function(q) {
        try {
          k(m(q));
        } catch (r) {
          l(r);
        }
      } : n;
    }
    var k, l, t = new e(function(m, n) {
      k = m;
      l = n;
    });
    this.callWhenSettled_(g(a, k), g(d, l));
    return t;
  };
  e.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  e.prototype.callWhenSettled_ = function(a, d) {
    function g() {
      switch(k.state_) {
        case 1:
          a(k.result_);
          break;
        case 2:
          d(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? p.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  e.resolve = f;
  e.reject = function(a) {
    return new e(function(d, g) {
      g(a);
    });
  };
  e.race = function(a) {
    return new e(function(d, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        f(l.value).callWhenSettled_(d, g);
      }
    });
  };
  e.all = function(a) {
    var d = $jscomp.makeIterator(a), g = d.next();
    return g.done ? f([]) : new e(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, f(g.value).callWhenSettled_(t(m.length - 1), l), g = d.next();
      } while (!g.done);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(b) {
  return b ? b : function(c) {
    return this.then(function(f) {
      return Promise.resolve(c()).then(function() {
        return f;
      });
    }, function(f) {
      return Promise.resolve(c()).then(function() {
        throw f;
      });
    });
  };
}, "es9", "es3");
module.exports = function(b) {
  var c = 0;
  Promise.reject("foobar").finally(function() {
    return Promise.reject("foo");
  }).catch(function(f) {
    c += "foo" === f;
    2 === c && b();
    return Promise.reject("foobar");
  }).finally(function() {
    throw Error("bar");
  }).catch(function(f) {
    c += "bar" === f.message;
    2 === c && b();
  });
};

