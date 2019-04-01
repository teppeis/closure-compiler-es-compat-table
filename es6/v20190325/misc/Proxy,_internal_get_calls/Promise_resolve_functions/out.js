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
  return e ? e.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, e, g) {
  b != Array.prototype && b != Object.prototype && (b[e] = g.value);
};
$jscomp.polyfill = function(b, e, g, f) {
  if (e) {
    g = $jscomp.global;
    b = b.split(".");
    for (f = 0; f < b.length - 1; f++) {
      var c = b[f];
      c in g || (g[c] = {});
      g = g[c];
    }
    b = b[b.length - 1];
    f = g[b];
    e = e(f);
    e != f && null != e && $jscomp.defineProperty(g, b, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function e() {
    this.batch_ = null;
  }
  function g(a) {
    return a instanceof c ? a : new c(function(d, b) {
      d(a);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
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
  var f = $jscomp.global.setTimeout;
  e.prototype.asyncExecuteFunction = function(a) {
    f(a, 0);
  };
  e.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var d = 0; d < a.length; ++d) {
        var b = a[d];
        a[d] = null;
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
  var c = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var d = this.createResolveAndReject_();
    try {
      a(d.resolve, d.reject);
    } catch (h) {
      d.reject(h);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(c) {
        b || (b = !0, a.call(d, c));
      };
    }
    var d = this, b = !1;
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
    } catch (h) {
      this.reject_(h);
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
  var l = new e;
  c.prototype.settleSameAsPromise_ = function(a) {
    var d = this.createResolveAndReject_();
    a.callWhenSettled_(d.resolve, d.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, d) {
    var b = this.createResolveAndReject_();
    try {
      a.call(d, b.resolve, b.reject);
    } catch (k) {
      b.reject(k);
    }
  };
  c.prototype.then = function(a, b) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          g(m);
        }
      } : b;
    }
    var e, g, f = new c(function(a, b) {
      e = a;
      g = b;
    });
    this.callWhenSettled_(d(a, e), d(b, g));
    return f;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, b) {
    function d() {
      switch(c.state_) {
        case 1:
          a(c.result_);
          break;
        case 2:
          b(c.result_);
          break;
        default:
          throw Error("Unexpected state: " + c.state_);
      }
    }
    var c = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(d) : this.onSettledCallbacks_.push(d);
  };
  c.resolve = g;
  c.reject = function(a) {
    return new c(function(b, c) {
      c(a);
    });
  };
  c.race = function(a) {
    return new c(function(b, c) {
      for (var d = $jscomp.makeIterator(a), e = d.next(); !e.done; e = d.next()) {
        g(e.value).callWhenSettled_(b, c);
      }
    });
  };
  c.all = function(a) {
    var b = $jscomp.makeIterator(a), e = b.next();
    return e.done ? g([]) : new c(function(a, c) {
      function d(b) {
        return function(c) {
          f[b] = c;
          h--;
          0 == h && a(f);
        };
      }
      var f = [], h = 0;
      do {
        f.push(void 0), h++, g(e.value).callWhenSettled_(d(f.length - 1), c), e = b.next();
      } while (!e.done);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  var b = [], e = new Proxy({}, {get:function(e, f) {
    b.push(f);
    return e[f];
  }});
  new Promise(function(b) {
    b(e);
  });
  return "then" === b + "";
};

