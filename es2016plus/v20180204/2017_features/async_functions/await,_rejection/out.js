var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, f) {
  a != Array.prototype && a != Object.prototype && (a[b] = f.value);
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
  return function(b) {
    return $jscomp.SYMBOL_PREFIX + (b || "") + a++;
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
  var b = 0;
  return $jscomp.iteratorPrototype(function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
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
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, b, f, e) {
  if (b) {
    f = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var d = a[e];
      d in f || (f[d] = {});
      f = f[d];
    }
    a = a[a.length - 1];
    e = f[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function f(c) {
    return c instanceof d ? c : new d(function(a, b) {
      a(c);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(c) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(c);
    return this;
  };
  b.prototype.asyncExecuteBatch_ = function() {
    var c = this;
    this.asyncExecuteFunction(function() {
      c.executeBatch_();
    });
  };
  var e = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(c) {
    e(c, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var c = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < c.length; ++a) {
        var b = c[a];
        delete c[a];
        try {
          b();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(c) {
    this.asyncExecuteFunction(function() {
      throw c;
    });
  };
  var d = function(c) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      c(a.resolve, a.reject);
    } catch (g) {
      a.reject(g);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function c(c) {
      return function(d) {
        b || (b = !0, c.call(a, d));
      };
    }
    var a = this, b = !1;
    return {resolve:c(this.resolveTo_), reject:c(this.reject_)};
  };
  d.prototype.resolveTo_ = function(c) {
    if (c === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (c instanceof d) {
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
  d.prototype.resolveToNonPromiseObj_ = function(c) {
    var a = void 0;
    try {
      a = c.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, c) : this.fulfill_(c);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, b = 0; b < a.length; ++b) {
        a[b].call(), a[b] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var h = new b;
  d.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  d.prototype.then = function(a, b) {
    function c(a, c) {
      return "function" == typeof a ? function(c) {
        try {
          e(a(c));
        } catch (l) {
          f(l);
        }
      } : c;
    }
    var e, f, h = new d(function(a, c) {
      e = a;
      f = c;
    });
    this.callWhenSettled_(c(a, e), c(b, f));
    return h;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, b) {
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
  d.resolve = f;
  d.reject = function(a) {
    return new d(function(c, b) {
      b(a);
    });
  };
  d.race = function(a) {
    return new d(function(c, b) {
      for (var d = $jscomp.makeIterator(a), e = d.next(); !e.done; e = d.next()) {
        f(e.value).callWhenSettled_(c, b);
      }
    });
  };
  d.all = function(a) {
    var b = $jscomp.makeIterator(a), c = b.next();
    return c.done ? f([]) : new d(function(a, d) {
      function e(c) {
        return function(b) {
          h[c] = b;
          g--;
          0 == g && a(h);
        };
      }
      var h = [], g = 0;
      do {
        h.push(void 0), g++, f(c.value).callWhenSettled_(e(h.length - 1), d), c = b.next();
      } while (!c.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.executeAsyncGenerator = function(a) {
  function b(b) {
    return a.next(b);
  }
  function f(b) {
    return a.throw(b);
  }
  return new Promise(function(e, d) {
    function h(a) {
      a.done ? e(a.value) : Promise.resolve(a.value).then(b, f).then(h, d);
    }
    h(a.next());
  });
};
module.exports = function() {
  (function() {
    return $jscomp.executeAsyncGenerator(function() {
      function a(a, c, d) {
        for (;;) {
          switch(b) {
            case 0:
              return b = 1, {value:Promise.resolve(), done:!1};
            case 1:
              if (1 != a) {
                b = 2;
                break;
              }
              b = -1;
              throw d;
            case 2:
              try {
                return b = 5, {value:new Promise(function(a, b) {
                  setTimeout(b, 800, "foo");
                }), done:!1};
              } catch (g) {
                e = g;
                b = 3;
                break;
              }
            case 5:
              try {
                if (1 != a) {
                  b = 6;
                  break;
                }
                b = -1;
                throw d;
              } catch (g) {
                e = g;
                b = 3;
                break;
              }
            case 6:
              try {
                b = 4;
                break;
              } catch (g) {
                e = g;
                b = 3;
                break;
              }
            case 3:
              f = e, "foo" === f && asyncTestPassed();
            case 4:
              b = -1;
            default:
              return {value:void 0, done:!0};
          }
        }
      }
      var b = 0, f, e, d = {next:function(b) {
        return a(0.0, b, void 0);
      }, throw:function(b) {
        return a(1.0, void 0, b);
      }, return:function(a) {
        throw Error("Not yet implemented");
      }};
      $jscomp.initSymbolIterator();
      d[Symbol.iterator] = function() {
        return this;
      };
      return d;
    }());
  })();
};

