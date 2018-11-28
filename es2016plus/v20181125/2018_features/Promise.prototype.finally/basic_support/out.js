var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, e) {
  a != Array.prototype && a != Object.prototype && (a[d] = e.value);
};
$jscomp.polyfill = function(a, d, e, f) {
  if (d) {
    e = $jscomp.global;
    a = a.split(".");
    for (f = 0; f < a.length - 1; f++) {
      var c = a[f];
      c in e || (e[c] = {});
      e = e[c];
    }
    a = a[a.length - 1];
    f = e[a];
    d = d(f);
    d != f && null != d && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function d() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof c ? b : new c(function(g, a) {
      g(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
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
  var f = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(b) {
    f(b, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var g = 0; g < b.length; ++g) {
        var a = b[g];
        b[g] = null;
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
  var c = function(b) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var g = this.createResolveAndReject_();
    try {
      b(g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(c) {
        a || (a = !0, b.call(g, c));
      };
    }
    var g = this, a = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  c.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof c) {
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
  c.prototype.resolveToNonPromiseObj_ = function(b) {
    var a = void 0;
    try {
      a = b.then;
    } catch (k) {
      this.reject_(k);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, b) : this.fulfill_(b);
  };
  c.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  c.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  c.prototype.settle_ = function(b, a) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + a + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = a;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        h.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new d;
  c.prototype.settleSameAsPromise_ = function(b) {
    var a = this.createResolveAndReject_();
    b.callWhenSettled_(a.resolve, a.reject);
  };
  c.prototype.settleSameAsThenable_ = function(b, a) {
    var c = this.createResolveAndReject_();
    try {
      b.call(a, c.resolve, c.reject);
    } catch (l) {
      c.reject(l);
    }
  };
  c.prototype.then = function(b, a) {
    function d(b, a) {
      return "function" == typeof b ? function(a) {
        try {
          e(b(a));
        } catch (m) {
          g(m);
        }
      } : a;
    }
    var e, g, f = new c(function(b, a) {
      e = b;
      g = a;
    });
    this.callWhenSettled_(d(b, e), d(a, g));
    return f;
  };
  c.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  c.prototype.callWhenSettled_ = function(b, a) {
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
  c.resolve = e;
  c.reject = function(b) {
    return new c(function(a, c) {
      c(b);
    });
  };
  c.race = function(b) {
    return new c(function(a, c) {
      for (var d = $jscomp.makeIterator(b), g = d.next(); !g.done; g = d.next()) {
        e(g.value).callWhenSettled_(a, c);
      }
    });
  };
  c.all = function(b) {
    var a = $jscomp.makeIterator(b), d = a.next();
    return d.done ? e([]) : new c(function(b, c) {
      function g(a) {
        return function(c) {
          f[a] = c;
          h--;
          0 == h && b(f);
        };
      }
      var f = [], h = 0;
      do {
        f.push(void 0), h++, e(d.value).callWhenSettled_(g(f.length - 1), c), d = a.next();
      } while (!d.done);
    });
  };
  return c;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(a) {
  return a ? a : function(a) {
    return this.then(function(d) {
      return Promise.resolve(a()).then(function() {
        return d;
      });
    }, function(d) {
      return Promise.resolve(a()).then(function() {
        throw d;
      });
    });
  };
}, "es9", "es3");
module.exports = function(a) {
  function d() {
    h += 0 === arguments.length;
    e();
  }
  function e() {
    5 === h && a();
  }
  var f = Promise.resolve("foo"), c = Promise.reject("bar"), h = 0;
  f.then(function(a) {
    h += "foo" === a;
    e();
  });
  f.finally(d);
  f.finally(function() {
    h += f.finally() !== f;
    e();
  });
  c.catch(function(a) {
    h += "bar" === a;
    e();
  });
  c.finally(d);
};

