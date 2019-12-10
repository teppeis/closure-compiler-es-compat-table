var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(d) {
  var e = 0;
  return function() {
    return e < d.length ? {done:!1, value:d[e++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(d) {
  return {next:$jscomp.arrayIteratorImpl(d)};
};
$jscomp.makeIterator = function(d) {
  var e = "undefined" != typeof Symbol && Symbol.iterator && d[Symbol.iterator];
  return e ? e.call(d) : $jscomp.arrayIterator(d);
};
$jscomp.getGlobal = function(d) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : d;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(d, e, f) {
  d != Array.prototype && d != Object.prototype && (d[e] = f.value);
};
$jscomp.polyfill = function(d, e, f, g) {
  if (e) {
    f = $jscomp.global;
    d = d.split(".");
    for (g = 0; g < d.length - 1; g++) {
      var b = d[g];
      b in f || (f[b] = {});
      f = f[b];
    }
    d = d[d.length - 1];
    g = f[d];
    e = e(g);
    e != g && null != e && $jscomp.defineProperty(f, d, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(d) {
  function e() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof b ? a : new b(function(c, b) {
      c(a);
    });
  }
  if (d && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return d;
  }
  e.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var c = this;
      this.asyncExecuteFunction(function() {
        c.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var g = $jscomp.global.setTimeout;
  e.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  e.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var c = 0; c < a.length; ++c) {
        var b = a[c];
        a[c] = null;
        try {
          b();
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
    var c = this.createResolveAndReject_();
    try {
      a(c.resolve, c.reject);
    } catch (h) {
      c.reject(h);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        b || (b = !0, a.call(c, d));
      };
    }
    var c = this, b = !1;
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
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var c = void 0;
    try {
      c = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a);
  };
  b.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  b.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  b.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    this.executeOnSettledCallbacks_();
  };
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new e;
  b.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, c) {
    var b = this.createResolveAndReject_();
    try {
      a.call(c, b.resolve, b.reject);
    } catch (k) {
      b.reject(k);
    }
  };
  b.prototype.then = function(a, c) {
    function d(a, c) {
      return "function" == typeof a ? function(c) {
        try {
          e(a(c));
        } catch (m) {
          f(m);
        }
      } : c;
    }
    var e, f, g = new b(function(a, c) {
      e = a;
      f = c;
    });
    this.callWhenSettled_(d(a, e), d(c, f));
    return g;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.callWhenSettled_ = function(a, c) {
    function b() {
      switch(d.state_) {
        case 1:
          a(d.result_);
          break;
        case 2:
          c(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(b) : this.onSettledCallbacks_.push(b);
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(c, b) {
      b(a);
    });
  };
  b.race = function(a) {
    return new b(function(c, b) {
      for (var d = $jscomp.makeIterator(a), e = d.next(); !e.done; e = d.next()) {
        f(e.value).callWhenSettled_(c, b);
      }
    });
  };
  b.all = function(a) {
    var c = $jscomp.makeIterator(a), d = c.next();
    return d.done ? f([]) : new b(function(a, b) {
      function e(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, f(d.value).callWhenSettled_(e(g.length - 1), b), d = c.next();
      } while (!d.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  return Promise.try(function() {
  }) instanceof Promise;
};

