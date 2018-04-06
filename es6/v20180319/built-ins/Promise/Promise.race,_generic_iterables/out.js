var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, f) {
  a != Array.prototype && a != Object.prototype && (a[d] = f.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(a) {
  var d = 0;
  return $jscomp.iteratorPrototype(function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var d = a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, d, f, e) {
  if (d) {
    f = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var b = a[e];
      b in f || (f[b] = {});
      f = f[b];
    }
    a = a[a.length - 1];
    e = f[a];
    d = d(e);
    d != e && null != d && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function d() {
    this.batch_ = null;
  }
  function f(c) {
    return c instanceof b ? c : new b(function(k, a) {
      k(c);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  d.prototype.asyncExecute = function(c) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(c);
    return this;
  };
  d.prototype.asyncExecuteBatch_ = function() {
    var c = this;
    this.asyncExecuteFunction(function() {
      c.executeBatch_();
    });
  };
  var e = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(c) {
    e(c, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var c = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < c.length; ++a) {
        var b = c[a];
        delete c[a];
        try {
          b();
        } catch (g) {
          this.asyncThrow_(g);
        }
      }
    }
    this.batch_ = null;
  };
  d.prototype.asyncThrow_ = function(c) {
    this.asyncExecuteFunction(function() {
      throw c;
    });
  };
  var b = function(c) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      c(a.resolve, a.reject);
    } catch (l) {
      a.reject(l);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function c(c) {
      return function(k) {
        b || (b = !0, c.call(a, k));
      };
    }
    var a = this, b = !1;
    return {resolve:c(this.resolveTo_), reject:c(this.reject_)};
  };
  b.prototype.resolveTo_ = function(c) {
    if (c === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (c instanceof b) {
        this.settleSameAsPromise_(c);
      } else {
        a: {
          switch(typeof c) {
            case "object":
              var a = null != c;
              break a;
            case "function":
              a = !0;
              break a;
            default:
              a = !1;
          }
        }
        a ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c);
      }
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(c) {
    var a = void 0;
    try {
      a = c.then;
    } catch (l) {
      this.reject_(l);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, c) : this.fulfill_(c);
  };
  b.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  b.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  b.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, b = 0; b < a.length; ++b) {
        a[b].call(), a[b] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new d;
  b.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (g) {
      c.reject(g);
    }
  };
  b.prototype.then = function(a, d) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          g(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var g, f, e = new b(function(a, b) {
      g = a;
      f = b;
    });
    this.callWhenSettled_(c(a, g), c(d, f));
    return e;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.callWhenSettled_ = function(a, b) {
    function c() {
      switch(d.state_) {
        case 1:
          a(d.result_);
          break;
        case 2:
          b(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? h.asyncExecute(c) : this.onSettledCallbacks_.push(function() {
      h.asyncExecute(c);
    });
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var d = $jscomp.makeIterator(a), e = d.next(); !e.done; e = d.next()) {
        f(e.value).callWhenSettled_(b, c);
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
module.exports = function(a) {
  var d = Promise.race(global.__createIterableObject([new Promise(function(a) {
    setTimeout(a, 1000, "foo");
  }), new Promise(function(a, d) {
    setTimeout(d, 2000, "bar");
  })])), f = Promise.race(global.__createIterableObject([new Promise(function(a, d) {
    setTimeout(d, 1000, "baz");
  }), new Promise(function(a) {
    setTimeout(a, 2000, "qux");
  })])), e = 0;
  d.then(function(b) {
    e += "foo" === b;
    2 === e && a();
  });
  f.catch(function(b) {
    e += "baz" === b;
    2 === e && a();
  });
};
$jscomp.initSymbolIterator();

