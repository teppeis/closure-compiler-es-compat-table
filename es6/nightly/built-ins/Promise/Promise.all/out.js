var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var d = 0;
  return function() {
    return d < c.length ? {done:!1, value:c[d++]} : {done:!0};
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
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, d, g) {
  c != Array.prototype && c != Object.prototype && (c[d] = g.value);
};
$jscomp.polyfill = function(c, d, g, f) {
  if (d) {
    g = $jscomp.global;
    c = c.split(".");
    for (f = 0; f < c.length - 1; f++) {
      var a = c[f];
      a in g || (g[a] = {});
      g = g[a];
    }
    c = c[c.length - 1];
    f = g[c];
    d = d(f);
    d != f && null != d && $jscomp.defineProperty(g, c, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(c) {
  function d() {
    this.batch_ = null;
  }
  function g(b) {
    return b instanceof a ? b : new a(function(e, a) {
      e(b);
    });
  }
  if (c && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return c;
  }
  d.prototype.asyncExecute = function(b) {
    if (null == this.batch_) {
      this.batch_ = [];
      var e = this;
      this.asyncExecuteFunction(function() {
        e.executeBatch_();
      });
    }
    this.batch_.push(b);
  };
  var f = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(b) {
    f(b, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var e = 0; e < b.length; ++e) {
        var a = b[e];
        b[e] = null;
        try {
          a();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  d.prototype.asyncThrow_ = function(b) {
    this.asyncExecuteFunction(function() {
      throw b;
    });
  };
  var a = function(b) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      b(a.resolve, a.reject);
    } catch (k) {
      a.reject(k);
    }
  };
  a.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(e) {
        c || (c = !0, b.call(a, e));
      };
    }
    var a = this, c = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  a.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof a) {
        this.settleSameAsPromise_(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var e = null != b;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
      }
    }
  };
  a.prototype.resolveToNonPromiseObj_ = function(b) {
    var a = void 0;
    try {
      a = b.then;
    } catch (k) {
      this.reject_(k);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, b) : this.fulfill_(b);
  };
  a.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  a.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  a.prototype.settle_ = function(b, a) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + a + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = a;
    this.executeOnSettledCallbacks_();
  };
  a.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        h.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new d;
  a.prototype.settleSameAsPromise_ = function(b) {
    var a = this.createResolveAndReject_();
    b.callWhenSettled_(a.resolve, a.reject);
  };
  a.prototype.settleSameAsThenable_ = function(b, a) {
    var c = this.createResolveAndReject_();
    try {
      b.call(a, c.resolve, c.reject);
    } catch (l) {
      c.reject(l);
    }
  };
  a.prototype.then = function(b, c) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          g(m);
        }
      } : b;
    }
    var e, g, f = new a(function(b, a) {
      e = b;
      g = a;
    });
    this.callWhenSettled_(d(b, e), d(c, g));
    return f;
  };
  a.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  a.prototype.callWhenSettled_ = function(b, a) {
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
    null == this.onSettledCallbacks_ ? h.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  a.resolve = g;
  a.reject = function(b) {
    return new a(function(a, c) {
      c(b);
    });
  };
  a.race = function(b) {
    return new a(function(a, c) {
      for (var d = $jscomp.makeIterator(b), e = d.next(); !e.done; e = d.next()) {
        g(e.value).callWhenSettled_(a, c);
      }
    });
  };
  a.all = function(b) {
    var c = $jscomp.makeIterator(b), d = c.next();
    return d.done ? g([]) : new a(function(a, b) {
      function e(b) {
        return function(c) {
          f[b] = c;
          h--;
          0 == h && a(f);
        };
      }
      var f = [], h = 0;
      do {
        f.push(void 0), h++, g(d.value).callWhenSettled_(e(f.length - 1), b), d = c.next();
      } while (!d.done);
    });
  };
  return a;
}, "es6", "es3");
module.exports = function(c) {
  var d = Promise.all([new Promise(function(a) {
    setTimeout(a, 2000, "foo");
  }), new Promise(function(a) {
    setTimeout(a, 1000, "bar");
  })]), g = Promise.all([new Promise(function(a, c) {
    setTimeout(c, 2000, "baz");
  }), new Promise(function(a, c) {
    setTimeout(c, 1000, "qux");
  })]), f = 0;
  d.then(function(a) {
    f += "foo,bar" === a + "";
    2 === f && c();
  });
  g.catch(function(a) {
    f += "qux" === a;
    2 === f && c();
  });
};

