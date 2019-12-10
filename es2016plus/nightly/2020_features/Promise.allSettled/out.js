var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var a = 0;
  return function() {
    return a < c.length ? {done:!1, value:c[a++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(c) {
  return {next:$jscomp.arrayIteratorImpl(c)};
};
$jscomp.makeIterator = function(c) {
  var a = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
  return a ? a.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.getGlobal = function(c) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, a, e) {
  c != Array.prototype && c != Object.prototype && (c[a] = e.value);
};
$jscomp.polyfill = function(c, a, e, g) {
  if (a) {
    e = $jscomp.global;
    c = c.split(".");
    for (g = 0; g < c.length - 1; g++) {
      var d = c[g];
      d in e || (e[d] = {});
      e = e[d];
    }
    c = c[c.length - 1];
    g = e[c];
    a = a(g);
    a != g && null != a && $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:a});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(c) {
  function a() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof d ? b : new d(function(f, a) {
      f(b);
    });
  }
  if (c && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return c;
  }
  a.prototype.asyncExecute = function(b) {
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
  a.prototype.asyncExecuteFunction = function(b) {
    g(b, 0);
  };
  a.prototype.executeBatch_ = function() {
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
  a.prototype.asyncThrow_ = function(b) {
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
  var h = new a;
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
$jscomp.polyfill("Array.from", function(c) {
  return c ? c : function(a, c, g) {
    c = null != c ? c : function(a) {
      return a;
    };
    var d = [], e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof e) {
      a = e.call(a);
      for (var b = 0; !(e = a.next()).done;) {
        d.push(c.call(g, e.value, b++));
      }
    } else {
      for (e = a.length, b = 0; b < e; b++) {
        d.push(c.call(g, a[b], b));
      }
    }
    return d;
  };
}, "es6", "es3");
$jscomp.polyfill("Promise.allSettled", function(c) {
  function a(a) {
    return {status:"fulfilled", value:a};
  }
  function e(a) {
    return {status:"rejected", reason:a};
  }
  return c ? c : function(c) {
    var d = this;
    c = Array.from(c, function(c) {
      return d.resolve(c).then(a, e);
    });
    return d.all(c);
  };
}, "es_next", "es3");
module.exports = function(c) {
  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function(a) {
    3 === a.length && "fulfilled" === a[0].status && 1 === a[0].value && "rejected" === a[1].status && 2 === a[1].reason && "fulfilled" === a[2].status && 3 === a[2].value && c();
  });
};

