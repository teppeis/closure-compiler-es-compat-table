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
  c = ["object" == typeof globalThis && globalThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, c];
  for (var a = 0; a < c.length; ++a) {
    var e = c[a];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, a, e) {
  c != Array.prototype && c != Object.prototype && (c[a] = e.value);
};
$jscomp.polyfill = function(c, a, e, f) {
  if (a) {
    e = $jscomp.global;
    c = c.split(".");
    for (f = 0; f < c.length - 1; f++) {
      var d = c[f];
      d in e || (e[d] = {});
      e = e[d];
    }
    c = c[c.length - 1];
    f = e[c];
    a = a(f);
    a != f && null != a && $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:a});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(c) {
  function a() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof d ? b : new d(function(g, a) {
      g(b);
    });
  }
  if (c && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return c;
  }
  a.prototype.asyncExecute = function(b) {
    if (null == this.batch_) {
      this.batch_ = [];
      var a = this;
      this.asyncExecuteFunction(function() {
        a.executeBatch_();
      });
    }
    this.batch_.push(b);
  };
  var f = $jscomp.global.setTimeout;
  a.prototype.asyncExecuteFunction = function(b) {
    f(b, 0);
  };
  a.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < b.length; ++a) {
        var c = b[a];
        b[a] = null;
        try {
          c();
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
    var a = this.createResolveAndReject_();
    try {
      b(a.resolve, a.reject);
    } catch (k) {
      a.reject(k);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(d) {
        c || (c = !0, b.call(a, d));
      };
    }
    var a = this, c = !1;
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
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        h.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new a;
  d.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, c) {
    var b = this.createResolveAndReject_();
    try {
      a.call(c, b.resolve, b.reject);
    } catch (l) {
      b.reject(l);
    }
  };
  d.prototype.then = function(a, c) {
    function b(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var e, f, g = new d(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(b(a, e), b(c, f));
    return g;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, c) {
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
    null == this.onSettledCallbacks_ ? h.asyncExecute(b) : this.onSettledCallbacks_.push(b);
  };
  d.resolve = e;
  d.reject = function(a) {
    return new d(function(b, c) {
      c(a);
    });
  };
  d.race = function(a) {
    return new d(function(b, c) {
      for (var d = $jscomp.makeIterator(a), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(b, c);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), c = b.next();
    return c.done ? e([]) : new d(function(a, d) {
      function f(b) {
        return function(c) {
          h[b] = c;
          g--;
          0 == g && a(h);
        };
      }
      var h = [], g = 0;
      do {
        h.push(void 0), g++, e(c.value).callWhenSettled_(f(h.length - 1), d), c = b.next();
      } while (!c.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(c) {
  return c ? c : function(a, c, f) {
    c = null != c ? c : function(a) {
      return a;
    };
    var d = [], e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof e) {
      a = e.call(a);
      for (var b = 0; !(e = a.next()).done;) {
        d.push(c.call(f, e.value, b++));
      }
    } else {
      for (e = a.length, b = 0; b < e; b++) {
        d.push(c.call(f, a[b], b));
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
}, "es_2020", "es3");
module.exports = function(c) {
  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function(a) {
    3 === a.length && "fulfilled" === a[0].status && 1 === a[0].value && "rejected" === a[1].status && 2 === a[1].reason && "fulfilled" === a[2].status && 3 === a[2].value && c();
  });
};

