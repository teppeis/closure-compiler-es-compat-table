var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, f) {
  a != Array.prototype && a != Object.prototype && (a[c] = f.value);
};
$jscomp.polyfill = function(a, c, f, g) {
  if (c) {
    f = $jscomp.global;
    a = a.split(".");
    for (g = 0; g < a.length - 1; g++) {
      var d = a[g];
      d in f || (f[d] = {});
      f = f[d];
    }
    a = a[a.length - 1];
    g = f[a];
    c = c(g);
    c != g && null != c && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function f(b) {
    return b instanceof d ? b : new d(function(e, a) {
      e(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(b) {
    if (null == this.batch_) {
      this.batch_ = [];
      var e = this;
      this.asyncExecuteFunction(function() {
        e.executeBatch_();
      });
    }
    this.batch_.push(b);
  };
  var g = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(b) {
    g(b, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var e = 0; e < b.length; ++e) {
        var a = b[e];
        b[e] = null;
        try {
          a();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(b) {
    this.asyncExecuteFunction(function() {
      throw b;
    });
  };
  var d = function(b) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var e = this.createResolveAndReject_();
    try {
      b(e.resolve, e.reject);
    } catch (h) {
      e.reject(h);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(c) {
        a || (a = !0, b.call(e, c));
      };
    }
    var e = this, a = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  d.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof d) {
        this.settleSameAsPromise_(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var a = null != b;
              break a;
            case "function":
              a = !0;
              break a;
            default:
              a = !1;
          }
        }
        a ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
      }
    }
  };
  d.prototype.resolveToNonPromiseObj_ = function(b) {
    var a = void 0;
    try {
      a = b.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, b) : this.fulfill_(b);
  };
  d.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  d.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  d.prototype.settle_ = function(b, a) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + a + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = a;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        l.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new c;
  d.prototype.settleSameAsPromise_ = function(b) {
    var a = this.createResolveAndReject_();
    b.callWhenSettled_(a.resolve, a.reject);
  };
  d.prototype.settleSameAsThenable_ = function(b, a) {
    var c = this.createResolveAndReject_();
    try {
      b.call(a, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  d.prototype.then = function(b, a) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (m) {
          e(m);
        }
      } : b;
    }
    var f, e, g = new d(function(b, a) {
      f = b;
      e = a;
    });
    this.callWhenSettled_(c(b, f), c(a, e));
    return g;
  };
  d.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  d.prototype.callWhenSettled_ = function(b, a) {
    function c() {
      switch(d.state_) {
        case 1:
          b(d.result_);
          break;
        case 2:
          a(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  d.resolve = f;
  d.reject = function(a) {
    return new d(function(b, c) {
      c(a);
    });
  };
  d.race = function(a) {
    return new d(function(b, c) {
      for (var d = $jscomp.makeIterator(a), e = d.next(); !e.done; e = d.next()) {
        f(e.value).callWhenSettled_(b, c);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), c = b.next();
    return c.done ? f([]) : new d(function(a, d) {
      function e(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, f(c.value).callWhenSettled_(e(g.length - 1), d), c = b.next();
      } while (!c.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(a) {
  return a ? a : function(a) {
    return this.then(function(c) {
      return Promise.resolve(a()).then(function() {
        return c;
      });
    }, function(c) {
      return Promise.resolve(a()).then(function() {
        throw c;
      });
    });
  };
}, "es9", "es3");
module.exports = function(a) {
  var c = 0;
  Promise.reject("foobar").finally(function() {
    return Promise.reject("foo");
  }).catch(function(f) {
    c += "foo" === f;
    2 === c && a();
    return Promise.reject("foobar");
  }).finally(function() {
    throw Error("bar");
  }).catch(function(f) {
    c += "bar" === f.message;
    2 === c && a();
  });
};

