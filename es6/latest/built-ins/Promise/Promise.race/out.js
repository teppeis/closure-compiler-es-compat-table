var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var d = 0;
  return function() {
    return d < c.length ? {done:!1, value:c[d++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(c) {
  return {next:$jscomp.arrayIteratorImpl(c)};
};
$jscomp.makeIterator = function(c) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
  return d ? d.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.getGlobal = function(c) {
  c = ["object" == typeof globalThis && globalThis, c, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var d = 0; d < c.length; ++d) {
    var f = c[d];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, d, f) {
  if (c == Array.prototype || c == Object.prototype) {
    return c;
  }
  c[d] = f.value;
  return c;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(c, d) {
  var f = $jscomp.propertyToPolyfillSymbol[d];
  if (null == f) {
    return c[d];
  }
  f = c[f];
  return void 0 !== f ? f : c[d];
};
$jscomp.polyfill = function(c, d, f, h) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(c, d, f, h) : $jscomp.polyfillUnisolated(c, d, f, h));
};
$jscomp.polyfillUnisolated = function(c, d, f, h) {
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
  d = d(h);
  d != h && null != d && $jscomp.defineProperty(f, c, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(c, d, f, h) {
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
  d = d(f);
  null != d && (c ? $jscomp.defineProperty($jscomp.polyfills, b, {configurable:!0, writable:!0, value:d}) : d !== f && ($jscomp.propertyToPolyfillSymbol[b] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(b) : $jscomp.POLYFILL_PREFIX + b, b = $jscomp.propertyToPolyfillSymbol[b], $jscomp.defineProperty(h, b, {configurable:!0, writable:!0, value:d})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(c) {
  function d() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof b ? a : new b(function(e, g) {
      e(a);
    });
  }
  if (c && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return c;
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
  var h = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var e = 0; e < a.length; ++e) {
        var g = a[e];
        a[e] = null;
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
  var b = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var e = this.createResolveAndReject_();
    try {
      a(e.resolve, e.reject);
    } catch (g) {
      e.reject(g);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(e, l));
      };
    }
    var e = this, g = !1;
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
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var e = void 0;
    try {
      e = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof e ? this.settleSameAsThenable_(e, a) : this.fulfill_(a);
  };
  b.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  b.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  b.prototype.settle_ = function(a, e) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + e + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = e;
    this.executeOnSettledCallbacks_();
  };
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        m.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var m = new d;
  b.prototype.settleSameAsPromise_ = function(a) {
    var e = this.createResolveAndReject_();
    a.callWhenSettled_(e.resolve, e.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, e) {
    var g = this.createResolveAndReject_();
    try {
      a.call(e, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  b.prototype.then = function(a, e) {
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
    this.callWhenSettled_(g(a, k), g(e, l));
    return t;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.callWhenSettled_ = function(a, e) {
    function g() {
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
    null == this.onSettledCallbacks_ ? m.asyncExecute(g) : this.onSettledCallbacks_.push(g);
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(e, g) {
      g(a);
    });
  };
  b.race = function(a) {
    return new b(function(e, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        f(l.value).callWhenSettled_(e, g);
      }
    });
  };
  b.all = function(a) {
    var e = $jscomp.makeIterator(a), g = e.next();
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
        n.push(void 0), p++, f(g.value).callWhenSettled_(t(n.length - 1), l), g = e.next();
      } while (!g.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function(c) {
  var d = Promise.race([new Promise(function(b) {
    setTimeout(b, 1000, "foo");
  }), new Promise(function(b, m) {
    setTimeout(m, 2000, "bar");
  }), ]), f = Promise.race([new Promise(function(b, m) {
    setTimeout(m, 1000, "baz");
  }), new Promise(function(b) {
    setTimeout(b, 2000, "qux");
  }), ]), h = 0;
  d.then(function(b) {
    h += "foo" === b;
    2 === h && c();
  });
  f.catch(function(b) {
    h += "baz" === b;
    2 === h && c();
  });
};

