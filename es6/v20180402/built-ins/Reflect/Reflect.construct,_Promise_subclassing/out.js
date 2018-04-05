var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var c = function() {
  };
  c.prototype = a;
  return new c;
};
$jscomp.construct = function() {
  function a() {
    function a() {
    }
    new a;
    Reflect.construct(a, [], function() {
    });
    return new a instanceof a;
  }
  if ("undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var c = Reflect.construct;
    return function(a, e, b) {
      a = c(a, e);
      b && Reflect.setPrototypeOf(a, b.prototype);
      return a;
    };
  }
  return function(a, c, b) {
    void 0 === b && (b = a);
    b = $jscomp.objectCreate(b.prototype || Object.prototype);
    return Function.prototype.apply.call(a, b, c) || b;
  };
}();
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, f) {
  a != Array.prototype && a != Object.prototype && (a[c] = f.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, f, e) {
  if (c) {
    f = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var b = a[e];
      b in f || (f[b] = {});
      f = f[b];
    }
    a = a[a.length - 1];
    e = f[a];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Reflect.construct", function(a) {
  return $jscomp.construct;
}, "es6", "es3");
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
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function f(d) {
    return d instanceof b ? d : new b(function(a, b) {
      a(d);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(d) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(d);
    return this;
  };
  c.prototype.asyncExecuteBatch_ = function() {
    var d = this;
    this.asyncExecuteFunction(function() {
      d.executeBatch_();
    });
  };
  var e = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(d) {
    e(d, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var d = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < d.length; ++a) {
        var b = d[a];
        d[a] = null;
        try {
          b();
        } catch (l) {
          this.asyncThrow_(l);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var b = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var d = this.createResolveAndReject_();
    try {
      a(d.resolve, d.reject);
    } catch (k) {
      d.reject(k);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        c || (c = !0, a.call(b, d));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  b.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var d = null != a;
              break a;
            case "function":
              d = !0;
              break a;
            default:
              d = !1;
          }
        }
        d ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (k) {
      this.reject_(k);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
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
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        g.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new c;
  b.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, b) {
    var d = this.createResolveAndReject_();
    try {
      a.call(b, d.resolve, d.reject);
    } catch (l) {
      d.reject(l);
    }
  };
  b.prototype.then = function(a, c) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (m) {
          e(m);
        }
      } : b;
    }
    var f, e, h = new b(function(a, b) {
      f = a;
      e = b;
    });
    this.callWhenSettled_(d(a, f), d(c, e));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.callWhenSettled_ = function(a, b) {
    function d() {
      switch(c.state_) {
        case 1:
          a(c.result_);
          break;
        case 2:
          b(c.result_);
          break;
        default:
          throw Error("Unexpected state: " + c.state_);
      }
    }
    var c = this;
    null == this.onSettledCallbacks_ ? g.asyncExecute(d) : this.onSettledCallbacks_.push(d);
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(b, d) {
      d(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, d) {
      for (var c = $jscomp.makeIterator(a), e = c.next(); !e.done; e = c.next()) {
        f(e.value).callWhenSettled_(b, d);
      }
    });
  };
  b.all = function(a) {
    var d = $jscomp.makeIterator(a), c = d.next();
    return c.done ? f([]) : new b(function(a, b) {
      function e(b) {
        return function(d) {
          g[b] = d;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, f(c.value).callWhenSettled_(e(g.length - 1), b), c = d.next();
      } while (!c.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  function a() {
  }
  function c(a) {
    g += "quux" === a;
    4 === g && asyncTestPassed();
  }
  function f(a) {
    g = -Infinity;
  }
  var e = Reflect.construct(Promise, [function(a, b) {
    a("foo");
  }], a), b = Reflect.construct(Promise, [function(a, b) {
    b("quux");
  }], a), g = +(e instanceof a && b instanceof a);
  e.then = b.then = Promise.prototype.then;
  e.catch = b.catch = Promise.prototype.catch;
  e.then(function(a) {
    g += "foo" === a;
    4 === g && asyncTestPassed();
  }, f);
  b.then(f, c);
  e.catch(f);
  b.catch(c);
};

