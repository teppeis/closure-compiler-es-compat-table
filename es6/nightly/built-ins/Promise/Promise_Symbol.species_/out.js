var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var e = 0;
  return function() {
    return e < b.length ? {done:!1, value:b[e++], } : {done:!0};
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, e, f) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[e] = f.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var e = 0; e < b.length; ++e) {
    var f = b[e];
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
var $jscomp$lookupPolyfilledValue = function(b, e) {
  var f = $jscomp.propertyToPolyfillSymbol[e];
  if (null == f) {
    return b[e];
  }
  f = b[f];
  return void 0 !== f ? f : b[e];
};
$jscomp.polyfill = function(b, e, f, h) {
  e && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, e, f, h) : $jscomp.polyfillUnisolated(b, e, f, h));
};
$jscomp.polyfillUnisolated = function(b, e, f, h) {
  f = $jscomp.global;
  b = b.split(".");
  for (h = 0; h < b.length - 1; h++) {
    var c = b[h];
    if (!(c in f)) {
      return;
    }
    f = f[c];
  }
  b = b[b.length - 1];
  h = f[b];
  e = e(h);
  e != h && null != e && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:e});
};
$jscomp.polyfillIsolated = function(b, e, f, h) {
  var c = b.split(".");
  b = 1 === c.length;
  h = c[0];
  h = !b && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < c.length - 1; l++) {
    var a = c[l];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  c = c[c.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? h[c] : null;
  e = e(f);
  null != e && (b ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:e}) : e !== f && (void 0 === $jscomp.propertyToPolyfillSymbol[c] && (f = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + f + "$" + c), $jscomp.defineProperty(h, $jscomp.propertyToPolyfillSymbol[c], {configurable:!0, writable:!0, value:e})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(b) {
  if (b) {
    return b;
  }
  var e = function(l, a) {
    this.$jscomp$symbol$id_ = l;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:a});
  };
  e.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var f = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", h = 0, c = function(l) {
    if (this instanceof c) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new e(f + (l || "") + "_" + h++, l);
  };
  return c;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(b) {
  if (b) {
    return b;
  }
  b = Symbol("Symbol.iterator");
  for (var e = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), f = 0; f < e.length; f++) {
    var h = $jscomp.global[e[f]];
    "function" === typeof h && "function" != typeof h.prototype[b] && $jscomp.defineProperty(h.prototype, b, {configurable:!0, writable:!0, value:function() {
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
  var e = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return e ? e.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.polyfill("Promise", function(b) {
  function e() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof c ? a : new c(function(d, g) {
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
  var c = function(a) {
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
  c.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(m) {
        g || (g = !0, k.call(d, m));
      };
    }
    var d = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  c.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof c) {
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
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
  };
  c.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  c.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  c.prototype.settle_ = function(a, d) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = d;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  c.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    h(function() {
      if (a.notifyUnhandledRejection_()) {
        var d = $jscomp.global.console;
        "undefined" !== typeof d && d.error(a.result_);
      }
    }, 1);
  };
  c.prototype.notifyUnhandledRejection_ = function() {
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
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new e;
  c.prototype.settleSameAsPromise_ = function(a) {
    var d = this.createResolveAndReject_();
    a.callWhenSettled_(d.resolve, d.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, d) {
    var g = this.createResolveAndReject_();
    try {
      a.call(d, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  c.prototype.then = function(a, d) {
    function g(n, p) {
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
    this.callWhenSettled_(g(a, k), g(d, m));
    return t;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, d) {
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
    null == this.onSettledCallbacks_ ? l.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  c.resolve = f;
  c.reject = function(a) {
    return new c(function(d, g) {
      g(a);
    });
  };
  c.race = function(a) {
    return new c(function(d, g) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        f(m.value).callWhenSettled_(d, g);
      }
    });
  };
  c.all = function(a) {
    var d = $jscomp.makeIterator(a), g = d.next();
    return g.done ? f([]) : new c(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, f(g.value).callWhenSettled_(t(n.length - 1), m), g = d.next();
      } while (!g.done);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  return "get" in Object.getOwnPropertyDescriptor(Promise, Symbol.species) && Promise[Symbol.species] === Promise;
};

