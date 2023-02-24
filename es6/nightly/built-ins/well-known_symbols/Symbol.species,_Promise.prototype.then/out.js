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
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, f) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[d] = f.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var d = 0; d < b.length; ++d) {
    var f = b[d];
    if (f && f.Math == Math) {
      return f;
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
var $jscomp$lookupPolyfilledValue = function(b, d, f) {
  if (!f || null != b) {
    f = $jscomp.propertyToPolyfillSymbol[d];
    if (null == f) {
      return b[d];
    }
    f = b[f];
    return void 0 !== f ? f : b[d];
  }
};
$jscomp.polyfill = function(b, d, f, g) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, d, f, g) : $jscomp.polyfillUnisolated(b, d, f, g));
};
$jscomp.polyfillUnisolated = function(b, d, f, g) {
  f = $jscomp.global;
  b = b.split(".");
  for (g = 0; g < b.length - 1; g++) {
    var c = b[g];
    if (!(c in f)) {
      return;
    }
    f = f[c];
  }
  b = b[b.length - 1];
  g = f[b];
  d = d(g);
  d != g && null != d && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(b, d, f, g) {
  var c = b.split(".");
  b = 1 === c.length;
  g = c[0];
  g = !b && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < c.length - 1; l++) {
    var a = c[l];
    if (!(a in g)) {
      return;
    }
    g = g[a];
  }
  c = c[c.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? g[c] : null;
  d = d(f);
  null != d && (b ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[c] && (f = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + f + "$" + c), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[c], {configurable:!0, writable:!0, value:d})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(b) {
  if (b) {
    return b;
  }
  var d = function(l, a) {
    this.$jscomp$symbol$id_ = l;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:a});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var f = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", g = 0, c = function(l) {
    if (this instanceof c) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d(f + (l || "") + "_" + g++, l);
  };
  return c;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(b) {
  if (b) {
    return b;
  }
  b = Symbol("Symbol.iterator");
  for (var d = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), f = 0; f < d.length; f++) {
    var g = $jscomp.global[d[f]];
    "function" === typeof g && "function" != typeof g.prototype[b] && $jscomp.defineProperty(g.prototype, b, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return b;
}, "es6", "es3");
$jscomp.iteratorPrototype = function(b) {
  b = {next:b};
  b[Symbol.iterator] = function() {
    return this;
  };
  return b;
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
$jscomp.polyfill("Promise", function(b) {
  function d() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof c ? a : new c(function(e, h) {
      e(a);
    });
  }
  if (b && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return b;
  }
  d.prototype.asyncExecute = function(a) {
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
  d.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  d.prototype.executeBatch_ = function() {
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
  d.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var c = function(a) {
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
  c.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(m) {
        h || (h = !0, k.call(e, m));
      };
    }
    var e = this, h = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  c.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (a instanceof c) {
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
  c.prototype.resolveToNonPromiseObj_ = function(a) {
    var e = void 0;
    try {
      e = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof e ? this.settleSameAsThenable_(e, a) : this.fulfill_(a);
  };
  c.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  c.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  c.prototype.settle_ = function(a, e) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + e + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = e;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  c.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    g(function() {
      if (a.notifyUnhandledRejection_()) {
        var e = $jscomp.global.console;
        "undefined" !== typeof e && e.error(a.result_);
      }
    }, 1);
  };
  c.prototype.notifyUnhandledRejection_ = function() {
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
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new d();
  c.prototype.settleSameAsPromise_ = function(a) {
    var e = this.createResolveAndReject_();
    a.callWhenSettled_(e.resolve, e.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, e) {
    var h = this.createResolveAndReject_();
    try {
      a.call(e, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  c.prototype.then = function(a, e) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var k, m, t = new c(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(h(a, k), h(e, m));
    return t;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, e) {
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
  c.resolve = f;
  c.reject = function(a) {
    return new c(function(e, h) {
      h(a);
    });
  };
  c.race = function(a) {
    return new c(function(e, h) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        f(m.value).callWhenSettled_(e, h);
      }
    });
  };
  c.all = function(a) {
    var e = $jscomp.makeIterator(a), h = e.next();
    return h.done ? f([]) : new c(function(k, m) {
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
  return c;
}, "es6", "es3");
module.exports = function() {
  var b = new Promise(function(g) {
    g(42);
  }), d = b.constructor = function(g) {
    g(function() {
    }, function() {
    });
  }, f = function(g) {
    g(function() {
    }, function() {
    });
  };
  Object.defineProperty(d, Symbol.species, {value:f});
  return b.then(function() {
  }) instanceof f;
};

