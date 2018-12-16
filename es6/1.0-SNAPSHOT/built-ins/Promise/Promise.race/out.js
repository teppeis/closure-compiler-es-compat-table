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
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, d, f) {
  c != Array.prototype && c != Object.prototype && (c[d] = f.value);
};
$jscomp.polyfill = function(c, d, f, e) {
  if (d) {
    f = $jscomp.global;
    c = c.split(".");
    for (e = 0; e < c.length - 1; e++) {
      var a = c[e];
      a in f || (f[a] = {});
      f = f[a];
    }
    c = c[c.length - 1];
    e = f[c];
    d = d(e);
    d != e && null != d && $jscomp.defineProperty(f, c, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(c) {
  function d() {
    this.batch_ = null;
  }
  function f(b) {
    return b instanceof a ? b : new a(function(a, c) {
      a(b);
    });
  }
  if (c && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return c;
  }
  d.prototype.asyncExecute = function(b) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(b);
    return this;
  };
  d.prototype.asyncExecuteBatch_ = function() {
    var b = this;
    this.asyncExecuteFunction(function() {
      b.executeBatch_();
    });
  };
  var e = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(b) {
    e(b, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < b.length; ++a) {
        var c = b[a];
        b[a] = null;
        try {
          c();
        } catch (g) {
          this.asyncThrow_(g);
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
      return function(l) {
        c || (c = !0, b.call(a, l));
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
              var c = null != b;
              break a;
            case "function":
              c = !0;
              break a;
            default:
              c = !1;
          }
        }
        c ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
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
  a.prototype.settleSameAsThenable_ = function(a, c) {
    var b = this.createResolveAndReject_();
    try {
      a.call(c, b.resolve, b.reject);
    } catch (g) {
      b.reject(g);
    }
  };
  a.prototype.then = function(b, c) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          g(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var g, f, e = new a(function(b, a) {
      g = b;
      f = a;
    });
    this.callWhenSettled_(d(b, g), d(c, f));
    return e;
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
  a.resolve = f;
  a.reject = function(b) {
    return new a(function(a, c) {
      c(b);
    });
  };
  a.race = function(b) {
    return new a(function(a, c) {
      for (var d = $jscomp.makeIterator(b), e = d.next(); !e.done; e = d.next()) {
        f(e.value).callWhenSettled_(a, c);
      }
    });
  };
  a.all = function(b) {
    var c = $jscomp.makeIterator(b), d = c.next();
    return d.done ? f([]) : new a(function(a, b) {
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
  return a;
}, "es6", "es3");
module.exports = function(c) {
  var d = Promise.race([new Promise(function(a) {
    setTimeout(a, 1000, "foo");
  }), new Promise(function(a, c) {
    setTimeout(c, 2000, "bar");
  })]), f = Promise.race([new Promise(function(a, c) {
    setTimeout(c, 1000, "baz");
  }), new Promise(function(a) {
    setTimeout(a, 2000, "qux");
  })]), e = 0;
  d.then(function(a) {
    e += "foo" === a;
    2 === e && c();
  });
  f.catch(function(a) {
    e += "baz" === a;
    2 === e && c();
  });
};

