var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
  a != Array.prototype && a != Object.prototype && (a[c] = e.value);
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
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + a++;
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
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
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
  var c = a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, c, e, f) {
  if (c) {
    e = $jscomp.global;
    a = a.split(".");
    for (f = 0; f < a.length - 1; f++) {
      var d = a[f];
      d in e || (e[d] = {});
      e = e[d];
    }
    a = a[a.length - 1];
    f = e[a];
    c = c(f);
    c != f && null != c && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof d ? b : new d(function(a, c) {
      a(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(b) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(b);
    return this;
  };
  c.prototype.asyncExecuteBatch_ = function() {
    var b = this;
    this.asyncExecuteFunction(function() {
      b.executeBatch_();
    });
  };
  var f = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(b) {
    f(b, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < b.length; ++a) {
        var c = b[a];
        b[a] = null;
        try {
          c();
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
    var a = this.createResolveAndReject_();
    try {
      b(a.resolve, a.reject);
    } catch (g) {
      a.reject(g);
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
  d.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new c;
  d.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, c) {
    var b = this.createResolveAndReject_();
    try {
      a.call(c, b.resolve, b.reject);
    } catch (k) {
      b.reject(k);
    }
  };
  d.prototype.then = function(a, c) {
    function b(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (n) {
          f(n);
        }
      } : b;
    }
    var e, f, m = new d(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(b(a, e), b(c, f));
    return m;
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
    null == this.onSettledCallbacks_ ? l.asyncExecute(b) : this.onSettledCallbacks_.push(b);
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
}, "es8", "es3");
module.exports = function(a) {
  var c = 0;
  Promise.reject("foobar").finally(function() {
    return Promise.reject("foo");
  }).catch(function(e) {
    c += "foo" === e;
    2 === c && a();
    return Promise.reject("foobar");
  }).finally(function() {
    throw Error("bar");
  }).catch(function(e) {
    c += "bar" === e.message;
    2 === c && a();
  });
};

