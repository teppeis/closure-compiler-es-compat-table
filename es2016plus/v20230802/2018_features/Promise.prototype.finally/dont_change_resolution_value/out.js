var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var e = 0;
  return function() {
    return e < b.length ? {done:!1, value:b[e++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var e = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  if (e) {
    return e.call(b);
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
  for (var e = 0; e < b.length; ++e) {
    var c = b[e];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, e, c) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[e] = c.value;
  return b;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, e, c) {
  if (!c || null != b) {
    c = $jscomp.propertyToPolyfillSymbol[e];
    if (null == c) {
      return b[e];
    }
    c = b[c];
    return void 0 !== c ? c : b[e];
  }
};
$jscomp.polyfill = function(b, e, c, h) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, e, c, h) : $jscomp.polyfillUnisolated(b, e, c, h));
};
$jscomp.polyfillUnisolated = function(b, e, c, h) {
  c = $jscomp.global;
  b = b.split(".");
  for (h = 0; h < b.length - 1; h++) {
    var f = b[h];
    if (!(f in c)) {
      return;
    }
    c = c[f];
  }
  b = b[b.length - 1];
  h = c[b];
  e = e(h);
  e != h && null != e && $jscomp.defineProperty(c, b, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(b, e, c, h) {
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
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? h[f] : null;
  e = e(c);
  null != e && (b ? $jscomp.defineProperty($jscomp.polyfills, f, {configurable:!0, writable:!0, value:e}) : e !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[f] && (c = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + c + "$" + f), $jscomp.defineProperty(h, $jscomp.propertyToPolyfillSymbol[f], {configurable:!0, writable:!0, value:e})));
};
$jscomp.polyfill("Promise", function(b) {
  function e() {
    this.batch_ = null;
  }
  function c(a) {
    return a instanceof f ? a : new f(function(d, g) {
      d(a);
    });
  }
  if (b && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return b;
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
  var f = function(a) {
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
  f.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(d, l));
      };
    }
    var d = this, g = !1;
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
  f.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (g) {
      this.reject_(g);
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
      throw Error("Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = d;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  f.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var d = $jscomp.global.console;
        "undefined" !== typeof d && d.error(a.result_);
      }
    }, 1);
  };
  f.prototype.notifyUnhandledRejection_ = function() {
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
  f.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        p.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new e();
  f.prototype.settleSameAsPromise_ = function(a) {
    var d = this.createResolveAndReject_();
    a.callWhenSettled_(d.resolve, d.reject);
  };
  f.prototype.settleSameAsThenable_ = function(a, d) {
    var g = this.createResolveAndReject_();
    try {
      a.call(d, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  f.prototype.then = function(a, d) {
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
    this.callWhenSettled_(g(a, k), g(d, l));
    return t;
  };
  f.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  f.prototype.callWhenSettled_ = function(a, d) {
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
  f.resolve = c;
  f.reject = function(a) {
    return new f(function(d, g) {
      g(a);
    });
  };
  f.race = function(a) {
    return new f(function(d, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        c(l.value).callWhenSettled_(d, g);
      }
    });
  };
  f.all = function(a) {
    var d = $jscomp.makeIterator(a), g = d.next();
    return g.done ? c([]) : new f(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, c(g.value).callWhenSettled_(t(m.length - 1), l), g = d.next();
      } while (!g.done);
    });
  };
  return f;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(b) {
  return b ? b : function(e) {
    return this.then(function(c) {
      return Promise.resolve(e()).then(function() {
        return c;
      });
    }, function(c) {
      return Promise.resolve(e()).then(function() {
        throw c;
      });
    });
  };
}, "es9", "es3");
module.exports = function(b) {
  function e() {
    c++;
    4 === c && b();
    return Promise.resolve("foobar");
  }
  var c = 0;
  Promise.resolve("foo").finally(e).then(function(h) {
    c += "foo" === h;
    4 === c && b();
  });
  Promise.reject("bar").finally(e).catch(function(h) {
    c += "bar" === h;
    4 === c && b();
  });
};

