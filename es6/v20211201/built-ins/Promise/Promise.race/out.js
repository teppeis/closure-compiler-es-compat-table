var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var e = 0;
  return function() {
    return e < c.length ? {done:!1, value:c[e++],} : {done:!0};
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
  c = ["object" == typeof globalThis && globalThis, c, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
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
    var b = c[h];
    if (!(b in f)) {
      return;
    }
    f = f[b];
  }
  c = c[c.length - 1];
  h = f[c];
  e = e(h);
  e != h && null != e && $jscomp.defineProperty(f, c, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(c, e, f, h) {
  var b = c.split(".");
  c = 1 === b.length;
  h = b[0];
  h = !c && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < b.length - 1; m++) {
    var a = b[m];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  b = b[b.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? h[b] : null;
  e = e(f);
  null != e && (c ? $jscomp.defineProperty($jscomp.polyfills, b, {configurable:!0, writable:!0, value:e}) : e !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[b] && (f = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[b] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(b) : $jscomp.POLYFILL_PREFIX + f + "$" + b), $jscomp.defineProperty(h, $jscomp.propertyToPolyfillSymbol[b], {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("Promise", function(c) {
  function e() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof b ? a : new b(function(d, g) {
      d(a);
    });
  }
  if (c && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return c;
  }
  e.prototype.asyncExecute = function(a) {
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
  e.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  e.prototype.executeBatch_ = function() {
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
    var d = this.createResolveAndReject_();
    try {
      a(d.resolve, d.reject);
    } catch (g) {
      d.reject(g);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(d, l));
      };
    }
    var d = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  b.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (a instanceof b) {
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
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
  };
  b.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  b.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  b.prototype.settle_ = function(a, d) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = d;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  b.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var d = $jscomp.global.console;
        "undefined" !== typeof d && d.error(a.result_);
      }
    }, 1);
  };
  b.prototype.notifyUnhandledRejection_ = function() {
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
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        m.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var m = new e();
  b.prototype.settleSameAsPromise_ = function(a) {
    var d = this.createResolveAndReject_();
    a.callWhenSettled_(d.resolve, d.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, d) {
    var g = this.createResolveAndReject_();
    try {
      a.call(d, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  b.prototype.then = function(a, d) {
    function g(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          l(r);
        }
      } : p;
    }
    var k, l, t = new b(function(n, p) {
      k = n;
      l = p;
    });
    this.callWhenSettled_(g(a, k), g(d, l));
    return t;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.callWhenSettled_ = function(a, d) {
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
    null == this.onSettledCallbacks_ ? m.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(d, g) {
      g(a);
    });
  };
  b.race = function(a) {
    return new b(function(d, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        f(l.value).callWhenSettled_(d, g);
      }
    });
  };
  b.all = function(a) {
    var d = $jscomp.makeIterator(a), g = d.next();
    return g.done ? f([]) : new b(function(k, l) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, f(g.value).callWhenSettled_(t(n.length - 1), l), g = d.next();
      } while (!g.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function(c) {
  var e = Promise.race([new Promise(function(b) {
    setTimeout(b, 1000, "foo");
  }), new Promise(function(b, m) {
    setTimeout(m, 2000, "bar");
  })]), f = Promise.race([new Promise(function(b, m) {
    setTimeout(m, 1000, "baz");
  }), new Promise(function(b) {
    setTimeout(b, 2000, "qux");
  })]), h = 0;
  e.then(function(b) {
    h += "foo" === b;
    2 === h && c();
  });
  f.catch(function(b) {
    h += "baz" === b;
    2 === h && c();
  });
};

