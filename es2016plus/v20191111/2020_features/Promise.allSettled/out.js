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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
  a != Array.prototype && a != Object.prototype && (a[c] = e.value);
};
$jscomp.polyfill = function(a, c, e, g) {
  if (c) {
    e = $jscomp.global;
    a = a.split(".");
    for (g = 0; g < a.length - 1; g++) {
      var d = a[g];
      d in e || (e[d] = {});
      e = e[d];
    }
    a = a[a.length - 1];
    g = e[a];
    c = c(g);
    c != g && null != c && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof d ? b : new d(function(f, a) {
      f(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(b) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
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
      for (var f = 0; f < b.length; ++f) {
        var a = b[f];
        b[f] = null;
        try {
          a();
        } catch (l) {
          this.asyncThrow_(l);
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
    var f = this.createResolveAndReject_();
    try {
      b(f.resolve, f.reject);
    } catch (k) {
      f.reject(k);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(c) {
        a || (a = !0, b.call(f, c));
      };
    }
    var f = this, a = !1;
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
    } catch (k) {
      this.reject_(k);
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
        h.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new c;
  d.prototype.settleSameAsPromise_ = function(b) {
    var a = this.createResolveAndReject_();
    b.callWhenSettled_(a.resolve, a.reject);
  };
  d.prototype.settleSameAsThenable_ = function(b, a) {
    var c = this.createResolveAndReject_();
    try {
      b.call(a, c.resolve, c.reject);
    } catch (l) {
      c.reject(l);
    }
  };
  d.prototype.then = function(b, a) {
    function c(b, a) {
      return "function" == typeof b ? function(a) {
        try {
          f(b(a));
        } catch (m) {
          e(m);
        }
      } : a;
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
    null == this.onSettledCallbacks_ ? h.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  d.resolve = e;
  d.reject = function(b) {
    return new d(function(a, c) {
      c(b);
    });
  };
  d.race = function(b) {
    return new d(function(a, c) {
      for (var d = $jscomp.makeIterator(b), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(a, c);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), c = b.next();
    return c.done ? e([]) : new d(function(a, d) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, e(c.value).callWhenSettled_(f(g.length - 1), d), c = b.next();
      } while (!c.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, e, g) {
    e = null != e ? e : function(a) {
      return a;
    };
    var c = [], h = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof h) {
      a = h.call(a);
      for (var b = 0; !(h = a.next()).done;) {
        c.push(e.call(g, h.value, b++));
      }
    } else {
      for (h = a.length, b = 0; b < h; b++) {
        c.push(e.call(g, a[b], b));
      }
    }
    return c;
  };
}, "es6", "es3");
$jscomp.polyfill("Promise.allSettled", function(a) {
  function c(a) {
    return {status:"fulfilled", value:a};
  }
  function e(a) {
    return {status:"rejected", reason:a};
  }
  return a ? a : function(a) {
    var d = this;
    a = Array.from(a, function(a) {
      return d.resolve(a).then(c, e);
    });
    return d.all(a);
  };
}, "es_next", "es3");
module.exports = function(a) {
  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function(c) {
    3 === c.length && "fulfilled" === c[0].status && 1 === c[0].value && "rejected" === c[1].status && 2 === c[1].reason && "fulfilled" === c[2].status && 3 === c[2].value && a();
  });
};

