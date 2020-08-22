var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return c ? c.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < b.length; ++c) {
    var e = b[c];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, e) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = e.value;
  return b;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var e = $jscomp.propertyToPolyfillSymbol[c];
  if (null == e) {
    return b[c];
  }
  e = b[e];
  return void 0 !== e ? e : b[c];
};
$jscomp.polyfill = function(b, c, e, h) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, e, h) : $jscomp.polyfillUnisolated(b, c, e, h));
};
$jscomp.polyfillUnisolated = function(b, c, e, h) {
  e = $jscomp.global;
  b = b.split(".");
  for (h = 0; h < b.length - 1; h++) {
    var d = b[h];
    if (!(d in e)) {
      return;
    }
    e = e[d];
  }
  b = b[b.length - 1];
  h = e[b];
  c = c(h);
  c != h && null != c && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, e, h) {
  var d = b.split(".");
  b = 1 === d.length;
  h = d[0];
  h = !b && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var p = 0; p < d.length - 1; p++) {
    var a = d[p];
    if (!(a in h)) {
      return;
    }
    h = h[a];
  }
  d = d[d.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? h[d] : null;
  c = c(e);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== e && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(h, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function c() {
    this.batch_ = null;
  }
  function e(a) {
    return a instanceof d ? a : new d(function(f, g) {
      f(a);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return b;
  }
  c.prototype.asyncExecute = function(a) {
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
  c.prototype.asyncExecuteFunction = function(a) {
    h(a, 0);
  };
  c.prototype.executeBatch_ = function() {
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
  c.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var d = function(a) {
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
  d.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        g || (g = !0, k.call(f, l));
      };
    }
    var f = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  d.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof d) {
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
  d.prototype.resolveToNonPromiseObj_ = function(a) {
    var f = void 0;
    try {
      f = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, a) : this.fulfill_(a);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = f;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        p.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new c;
  d.prototype.settleSameAsPromise_ = function(a) {
    var f = this.createResolveAndReject_();
    a.callWhenSettled_(f.resolve, f.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, f) {
    var g = this.createResolveAndReject_();
    try {
      a.call(f, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  d.prototype.then = function(a, f) {
    function g(m, n) {
      return "function" == typeof m ? function(q) {
        try {
          k(m(q));
        } catch (r) {
          l(r);
        }
      } : n;
    }
    var k, l, t = new d(function(m, n) {
      k = m;
      l = n;
    });
    this.callWhenSettled_(g(a, k), g(f, l));
    return t;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, f) {
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
    null == this.onSettledCallbacks_ ? p.asyncExecute(g) : this.onSettledCallbacks_.push(g);
  };
  d.resolve = e;
  d.reject = function(a) {
    return new d(function(f, g) {
      g(a);
    });
  };
  d.race = function(a) {
    return new d(function(f, g) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        e(l.value).callWhenSettled_(f, g);
      }
    });
  };
  d.all = function(a) {
    var f = $jscomp.makeIterator(a), g = f.next();
    return g.done ? e([]) : new d(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, e(g.value).callWhenSettled_(t(m.length - 1), l), g = f.next();
      } while (!g.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(b) {
  return b ? b : function(c) {
    return this.then(function(e) {
      return Promise.resolve(c()).then(function() {
        return e;
      });
    }, function(e) {
      return Promise.resolve(c()).then(function() {
        throw e;
      });
    });
  };
}, "es9", "es3");
module.exports = function(b) {
  function c() {
    e++;
    4 === e && b();
    return Promise.resolve("foobar");
  }
  var e = 0;
  Promise.resolve("foo").finally(c).then(function(h) {
    e += "foo" === h;
    4 === e && b();
  });
  Promise.reject("bar").finally(c).catch(function(h) {
    e += "bar" === h;
    4 === e && b();
  });
};

