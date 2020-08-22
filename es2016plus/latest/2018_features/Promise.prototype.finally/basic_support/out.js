var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var d = 0;
  return function() {
    return d < b.length ? {done:!1, value:b[d++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return d ? d.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var d = 0; d < b.length; ++d) {
    var e = b[d];
    if (e && e.Math == Math) {
      return e;
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
    var c = b[h];
    if (!(c in e)) {
      return;
    }
    e = e[c];
  }
  b = b[b.length - 1];
  h = e[b];
  d = d(h);
  d != h && null != d && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(b, d, e, h) {
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
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? h[c] : null;
  d = d(e);
  null != d && (b ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== e && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(h, c, {configurable:!0, writable:!0, value:d})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function d() {
    this.batch_ = null;
  }
  function e(a) {
    return a instanceof c ? a : new c(function(f, g) {
      f(a);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return b;
  }
  d.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
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
      for (var f = 0; f < a.length; ++f) {
        var g = a[f];
        a[f] = null;
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
  var c = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var f = this.createResolveAndReject_();
    try {
      a(f.resolve, f.reject);
    } catch (g) {
      f.reject(g);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(m) {
        g || (g = !0, k.call(f, m));
      };
    }
    var f = this, g = !1;
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
              var f = null != a;
              break a;
            case "function":
              f = !0;
              break a;
            default:
              f = !1;
          }
        }
        f ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(a) {
    var f = void 0;
    try {
      f = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, a) : this.fulfill_(a);
  };
  c.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  c.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  c.prototype.settle_ = function(a, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = f;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new d;
  c.prototype.settleSameAsPromise_ = function(a) {
    var f = this.createResolveAndReject_();
    a.callWhenSettled_(f.resolve, f.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, f) {
    var g = this.createResolveAndReject_();
    try {
      a.call(f, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  c.prototype.then = function(a, f) {
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
    this.callWhenSettled_(g(a, k), g(f, m));
    return t;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, f) {
    function g() {
      switch(k.state_) {
        case 1:
          a(k.result_);
          break;
        case 2:
          f(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(g) : this.onSettledCallbacks_.push(g);
  };
  c.resolve = e;
  c.reject = function(a) {
    return new c(function(f, g) {
      g(a);
    });
  };
  c.race = function(a) {
    return new c(function(f, g) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        e(m.value).callWhenSettled_(f, g);
      }
    });
  };
  c.all = function(a) {
    var f = $jscomp.makeIterator(a), g = f.next();
    return g.done ? e([]) : new c(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, e(g.value).callWhenSettled_(t(n.length - 1), m), g = f.next();
      } while (!g.done);
    });
  };
  return c;
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
    l += 0 === arguments.length;
    e();
  }
  function e() {
    5 === l && b();
  }
  var h = Promise.resolve("foo"), c = Promise.reject("bar"), l = 0;
  h.then(function(a) {
    l += "foo" === a;
    e();
  });
  h.finally(d);
  h.finally(function() {
    l += h.finally() !== h;
    e();
  });
  c.catch(function(a) {
    l += "bar" === a;
    e();
  });
  c.finally(d);
};

