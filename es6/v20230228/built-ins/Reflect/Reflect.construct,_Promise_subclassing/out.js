var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, f, e) {
  if (c == Array.prototype || c == Object.prototype) {
    return c;
  }
  c[f] = e.value;
  return c;
};
$jscomp.getGlobal = function(c) {
  c = ["object" == typeof globalThis && globalThis, c, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var f = 0; f < c.length; ++f) {
    var e = c[f];
    if (e && e.Math == Math) {
      return e;
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
var $jscomp$lookupPolyfilledValue = function(c, f, e) {
  if (!e || null != c) {
    e = $jscomp.propertyToPolyfillSymbol[f];
    if (null == e) {
      return c[f];
    }
    e = c[e];
    return void 0 !== e ? e : c[f];
  }
};
$jscomp.polyfill = function(c, f, e, h) {
  f && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(c, f, e, h) : $jscomp.polyfillUnisolated(c, f, e, h));
};
$jscomp.polyfillUnisolated = function(c, f, e, h) {
  e = $jscomp.global;
  c = c.split(".");
  for (h = 0; h < c.length - 1; h++) {
    var b = c[h];
    if (!(b in e)) {
      return;
    }
    e = e[b];
  }
  c = c[c.length - 1];
  h = e[c];
  f = f(h);
  f != h && null != f && $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:f});
};
$jscomp.polyfillIsolated = function(c, f, e, h) {
  var b = c.split(".");
  c = 1 === b.length;
  h = b[0];
  h = !c && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < b.length - 1; l++) {
    var a = b[l];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  b = b[b.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? h[b] : null;
  f = f(e);
  null != f && (c ? $jscomp.defineProperty($jscomp.polyfills, b, {configurable:!0, writable:!0, value:f}) : f !== e && (void 0 === $jscomp.propertyToPolyfillSymbol[b] && (e = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[b] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(b) : $jscomp.POLYFILL_PREFIX + e + "$" + b), $jscomp.defineProperty(h, $jscomp.propertyToPolyfillSymbol[b], {configurable:!0, writable:!0, value:f})));
};
$jscomp.polyfill("Reflect", function(c) {
  return c ? c : {};
}, "es6", "es3");
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(c) {
  var f = function() {
  };
  f.prototype = c;
  return new f();
};
$jscomp.getConstructImplementation = function() {
  function c() {
    function e() {
    }
    new e();
    Reflect.construct(e, [], function() {
    });
    return new e() instanceof e;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (c()) {
      return Reflect.construct;
    }
    var f = Reflect.construct;
    return function(e, h, b) {
      e = f(e, h);
      b && Reflect.setPrototypeOf(e, b.prototype);
      return e;
    };
  }
  return function(e, h, b) {
    void 0 === b && (b = e);
    b = $jscomp.objectCreate(b.prototype || Object.prototype);
    return Function.prototype.apply.call(e, b, h) || b;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.polyfill("Reflect.construct", function(c) {
  return $jscomp.construct;
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(c) {
  var f = 0;
  return function() {
    return f < c.length ? {done:!1, value:c[f++],} : {done:!0};
  };
};
$jscomp.arrayIterator = function(c) {
  return {next:$jscomp.arrayIteratorImpl(c)};
};
$jscomp.makeIterator = function(c) {
  var f = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
  if (f) {
    return f.call(c);
  }
  if ("number" == typeof c.length) {
    return $jscomp.arrayIterator(c);
  }
  throw Error(String(c) + " is not an iterable or ArrayLike");
};
$jscomp.polyfill("Promise", function(c) {
  function f() {
    this.batch_ = null;
  }
  function e(a) {
    return a instanceof b ? a : new b(function(d, g) {
      d(a);
    });
  }
  if (c && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return c;
  }
  f.prototype.asyncExecute = function(a) {
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
  f.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  f.prototype.executeBatch_ = function() {
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
  f.prototype.asyncThrow_ = function(a) {
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
      return function(m) {
        g || (g = !0, k.call(d, m));
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
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new f();
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
          m(r);
        }
      } : p;
    }
    var k, m, t = new b(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(g(a, k), g(d, m));
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
    null == this.onSettledCallbacks_ ? l.asyncExecute(g) : this.onSettledCallbacks_.push(g);
    this.isRejectionHandled_ = !0;
  };
  b.resolve = e;
  b.reject = function(a) {
    return new b(function(d, g) {
      g(a);
    });
  };
  b.race = function(a) {
    return new b(function(d, g) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        e(m.value).callWhenSettled_(d, g);
      }
    });
  };
  b.all = function(a) {
    var d = $jscomp.makeIterator(a), g = d.next();
    return g.done ? e([]) : new b(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, e(g.value).callWhenSettled_(t(n.length - 1), m), g = d.next();
      } while (!g.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function(c) {
  function f() {
  }
  function e(d) {
    a += "quux" === d;
    4 === a && c();
  }
  function h(d) {
    a = -Infinity;
  }
  var b = Reflect.construct(Promise, [function(d, g) {
    d("foo");
  }], f), l = Reflect.construct(Promise, [function(d, g) {
    g("quux");
  }], f), a = +(b instanceof f && l instanceof f);
  b.then = l.then = Promise.prototype.then;
  b.catch = l.catch = Promise.prototype.catch;
  b.then(function(d) {
    a += "foo" === d;
    4 === a && c();
  }, h);
  l.then(h, e);
  b.catch(h);
  l.catch(e);
};

