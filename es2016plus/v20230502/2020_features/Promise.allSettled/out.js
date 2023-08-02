var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++],} : {done:!0};
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
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
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
$jscomp.polyfill = function(b, c, f, g) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, f, g) : $jscomp.polyfillUnisolated(b, c, f, g));
};
$jscomp.polyfillUnisolated = function(b, c, f, g) {
  f = $jscomp.global;
  b = b.split(".");
  for (g = 0; g < b.length - 1; g++) {
    var d = b[g];
    if (!(d in f)) {
      return;
    }
    f = f[d];
  }
  b = b[b.length - 1];
  g = f[b];
  c = c(g);
  c != g && null != c && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, f, g) {
  var d = b.split(".");
  b = 1 === d.length;
  g = d[0];
  g = !b && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < d.length - 1; l++) {
    var a = d[l];
    if (!(a in g)) {
      return;
    }
    g = g[a];
  }
  d = d[d.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? g[d] : null;
  c = c(f);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[d] && (f = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + f + "$" + d), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[d], {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Promise", function(b) {
  function c() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof d ? a : new d(function(e, h) {
      e(a);
    });
  }
  if (b && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return b;
  }
  c.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var e = this;
      this.asyncExecuteFunction(function() {
        e.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var g = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var e = 0; e < a.length; ++e) {
        var h = a[e];
        a[e] = null;
        try {
          h();
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
  var d = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var e = this.createResolveAndReject_();
    try {
      a(e.resolve, e.reject);
    } catch (h) {
      e.reject(h);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(m) {
        h || (h = !0, k.call(e, m));
      };
    }
    var e = this, h = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  d.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (a instanceof d) {
      this.settleSameAsPromise_(a);
    } else {
      a: {
        switch(typeof a) {
          case "object":
            var e = null != a;
            break a;
          case "function":
            e = !0;
            break a;
          default:
            e = !1;
        }
      }
      e ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
    }
  };
  d.prototype.resolveToNonPromiseObj_ = function(a) {
    var e = void 0;
    try {
      e = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof e ? this.settleSameAsThenable_(e, a) : this.fulfill_(a);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, e) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + e + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = e;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  d.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    g(function() {
      if (a.notifyUnhandledRejection_()) {
        var e = $jscomp.global.console;
        "undefined" !== typeof e && e.error(a.result_);
      }
    }, 1);
  };
  d.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var a = $jscomp.global.CustomEvent, e = $jscomp.global.Event, h = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof a ? a = new a("unhandledrejection", {cancelable:!0}) : "function" === typeof e ? a = new e("unhandledrejection", {cancelable:!0}) : (a = $jscomp.global.document.createEvent("CustomEvent"), a.initCustomEvent("unhandledrejection", !1, !0, a));
    a.promise = this;
    a.reason = this.result_;
    return h(a);
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new c();
  d.prototype.settleSameAsPromise_ = function(a) {
    var e = this.createResolveAndReject_();
    a.callWhenSettled_(e.resolve, e.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, e) {
    var h = this.createResolveAndReject_();
    try {
      a.call(e, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  d.prototype.then = function(a, e) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var k, m, t = new d(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(h(a, k), h(e, m));
    return t;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, e) {
    function h() {
      switch(k.state_) {
        case 1:
          a(k.result_);
          break;
        case 2:
          e(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  d.resolve = f;
  d.reject = function(a) {
    return new d(function(e, h) {
      h(a);
    });
  };
  d.race = function(a) {
    return new d(function(e, h) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        f(m.value).callWhenSettled_(e, h);
      }
    });
  };
  d.all = function(a) {
    var e = $jscomp.makeIterator(a), h = e.next();
    return h.done ? f([]) : new d(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, f(h.value).callWhenSettled_(t(n.length - 1), m), h = e.next();
      } while (!h.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(b) {
  return b ? b : function(c, f, g) {
    f = null != f ? f : function(e) {
      return e;
    };
    var d = [], l = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
    if ("function" == typeof l) {
      c = l.call(c);
      for (var a = 0; !(l = c.next()).done;) {
        d.push(f.call(g, l.value, a++));
      }
    } else {
      for (l = c.length, a = 0; a < l; a++) {
        d.push(f.call(g, c[a], a));
      }
    }
    return d;
  };
}, "es6", "es3");
$jscomp.polyfill("Promise.allSettled", function(b) {
  function c(g) {
    return {status:"fulfilled", value:g};
  }
  function f(g) {
    return {status:"rejected", reason:g};
  }
  return b ? b : function(g) {
    var d = this;
    g = Array.from(g, function(l) {
      return d.resolve(l).then(c, f);
    });
    return d.all(g);
  };
}, "es_2020", "es3");
module.exports = function(b) {
  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function(c) {
    3 === c.length && "fulfilled" === c[0].status && 1 === c[0].value && "rejected" === c[1].status && 2 === c[1].reason && "fulfilled" === c[2].status && 3 === c[2].value && b();
  });
};

