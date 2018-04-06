var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, f) {
  a != Array.prototype && a != Object.prototype && (a[c] = f.value);
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
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var c = a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, c, f, e) {
  if (c) {
    f = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in f || (f[d] = {});
      f = f[d];
    }
    a = a[a.length - 1];
    e = f[a];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function f(b) {
    return b instanceof d ? b : new d(function(a, d) {
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
  var e = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(b) {
    e(b, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < b.length; ++a) {
        var d = b[a];
        delete b[a];
        try {
          d();
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
    var a = this.createResolveAndReject_();
    try {
      b(a.resolve, a.reject);
    } catch (k) {
      a.reject(k);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function b(b) {
      return function(h) {
        d || (d = !0, b.call(a, h));
      };
    }
    var a = this, d = !1;
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
      throw Error("Cannot settle(" + b + ", " + a | "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = a;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = this.onSettledCallbacks_, a = 0; a < b.length; ++a) {
        b[a].call(), b[a] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new c;
  d.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, d) {
    var b = this.createResolveAndReject_();
    try {
      a.call(d, b.resolve, b.reject);
    } catch (l) {
      b.reject(l);
    }
  };
  d.prototype.then = function(a, c) {
    function b(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (m) {
          e(m);
        }
      } : b;
    }
    var f, e, h = new d(function(a, b) {
      f = a;
      e = b;
    });
    this.callWhenSettled_(b(a, f), b(c, e));
    return h;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, d) {
    function b() {
      switch(c.state_) {
        case 1:
          a(c.result_);
          break;
        case 2:
          d(c.result_);
          break;
        default:
          throw Error("Unexpected state: " + c.state_);
      }
    }
    var c = this;
    null == this.onSettledCallbacks_ ? g.asyncExecute(b) : this.onSettledCallbacks_.push(function() {
      g.asyncExecute(b);
    });
  };
  d.resolve = f;
  d.reject = function(a) {
    return new d(function(b, d) {
      d(a);
    });
  };
  d.race = function(a) {
    return new d(function(b, d) {
      for (var c = $jscomp.makeIterator(a), e = c.next(); !e.done; e = c.next()) {
        f(e.value).callWhenSettled_(b, d);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), c = b.next();
    return c.done ? f([]) : new d(function(a, d) {
      function e(b) {
        return function(d) {
          g[b] = d;
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
$jscomp.executeAsyncGenerator = function(a) {
  function c(c) {
    return a.next(c);
  }
  function f(c) {
    return a.throw(c);
  }
  return new Promise(function(e, d) {
    function g(a) {
      a.done ? e(a.value) : Promise.resolve(a.value).then(c, f).then(g, d);
    }
    g(a.next());
  });
};
module.exports = function(a) {
  var c = function() {
  };
  c.prototype.a = function() {
    return $jscomp.executeAsyncGenerator(function() {
      function a(a, f, e) {
        for (;;) {
          switch(c) {
            case 0:
              return c = 1, {value:Promise.resolve("foo"), done:!1};
            case 1:
              if (1 != a) {
                c = 2;
                break;
              }
              c = -1;
              throw e;
            case 2:
              return d = f, c = -1, {value:d, done:!0};
            default:
              return {value:void 0, done:!0};
          }
        }
      }
      var c = 0, d, g = {next:function(b) {
        return a(0.0, b, void 0);
      }, throw:function(b) {
        return a(1.0, void 0, b);
      }, return:function(a) {
        throw Error("Not yet implemented");
      }};
      $jscomp.initSymbolIterator();
      g[Symbol.iterator] = function() {
        return this;
      };
      return g;
    }());
  };
  c = (new c).a();
  if (!(c instanceof Promise)) {
    return !1;
  }
  c.then(function(c) {
    "foo" === c && a();
  });
};

