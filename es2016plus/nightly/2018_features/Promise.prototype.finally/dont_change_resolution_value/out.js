var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var d = 0;
  return function() {
    return d < b.length ? {done:!1, value:b[d++],} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  if (d) {
    return d.call(b);
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
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var d = 0; d < b.length; ++d) {
    var e = b[d];
    if (e && e.Math == Math) {
      return e;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, e) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[d] = e.value;
  return b;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, d) {
  var e = $jscomp.propertyToPolyfillSymbol[d];
  if (null == e) {
    return b[d];
  }
  e = b[e];
  return void 0 !== e ? e : b[d];
};
$jscomp.polyfill = function(b, d, e, h) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, d, e, h) : $jscomp.polyfillUnisolated(b, d, e, h));
};
$jscomp.polyfillUnisolated = function(b, d, e, h) {
  e = $jscomp.global;
  b = b.split(".");
  for (h = 0; h < b.length - 1; h++) {
    var f = b[h];
    if (!(f in e)) {
      return;
    }
    e = e[f];
  }
  b = b[b.length - 1];
  h = e[b];
  d = d(h);
  d != h && null != d && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(b, d, e, h) {
  var f = b.split(".");
  b = 1 === f.length;
  h = f[0];
  h = !b && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var p = 0; p < f.length - 1; p++) {
    var a = f[p];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  f = f[f.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? h[f] : null;
  d = d(e);
  null != d && (b ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:d}) : d !== e && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && (e = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + e + "$" + f), $jscomp.defineProperty(h, $jscomp.propertyToPolyfillSymbol[f], {configurable:!0, writable:!0, value:d})));
};
$jscomp.polyfill("Promise", function(b) {
  function d() {
    this.batch_ = null;
  }
  function e(a) {
    return a instanceof f ? a : new f(function(c, g) {
      c(a);
    });
  }
  if (b && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return b;
  }
  d.prototype.asyncExecute = function(a) {
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
  d.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  d.prototype.executeBatch_ = function() {
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
  d.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var f = function(a) {
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
  f.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(c, l));
      };
    }
    var c = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  f.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (a instanceof f) {
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
  };
  f.prototype.resolveToNonPromiseObj_ = function(a) {
    var c = void 0;
    try {
      c = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a);
  };
  f.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  f.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  f.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  f.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var c = $jscomp.global.console;
        "undefined" !== typeof c && c.error(a.result_);
      }
    }, 1);
  };
  f.prototype.notifyUnhandledRejection_ = function() {
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
  f.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        p.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new d();
  f.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  f.prototype.settleSameAsThenable_ = function(a, c) {
    var g = this.createResolveAndReject_();
    try {
      a.call(c, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  f.prototype.then = function(a, c) {
    function g(m, n) {
      return "function" == typeof m ? function(q) {
        try {
          k(m(q));
        } catch (r) {
          l(r);
        }
      } : n;
    }
    var k, l, t = new f(function(m, n) {
      k = m;
      l = n;
    });
    this.callWhenSettled_(g(a, k), g(c, l));
    return t;
  };
  f.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  f.prototype.callWhenSettled_ = function(a, c) {
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
    null == this.onSettledCallbacks_ ? p.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  f.resolve = e;
  f.reject = function(a) {
    return new f(function(c, g) {
      g(a);
    });
  };
  f.race = function(a) {
    return new f(function(c, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        e(l.value).callWhenSettled_(c, g);
      }
    });
  };
  f.all = function(a) {
    var c = $jscomp.makeIterator(a), g = c.next();
    return g.done ? e([]) : new f(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, e(g.value).callWhenSettled_(t(m.length - 1), l), g = c.next();
      } while (!g.done);
    });
  };
  return f;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(b) {
  return b ? b : function(d) {
    return this.then(function(e) {
      return Promise.resolve(d()).then(function() {
        return e;
      });
    }, function(e) {
      return Promise.resolve(d()).then(function() {
        throw e;
      });
    });
  };
}, "es9", "es3");
module.exports = function(b) {
  function d() {
    e++;
    4 === e && b();
    return Promise.resolve("foobar");
  }
  var e = 0;
  Promise.resolve("foo").finally(d).then(function(h) {
    e += "foo" === h;
    4 === e && b();
  });
  Promise.reject("bar").finally(d).catch(function(h) {
    e += "bar" === h;
    4 === e && b();
  });
};

