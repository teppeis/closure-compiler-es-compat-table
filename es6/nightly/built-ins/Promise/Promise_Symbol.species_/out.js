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
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, e) {
  a != Array.prototype && a != Object.prototype && (a[d] = e.value);
};
$jscomp.getGlobal = function(a) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(a, d) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:d});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function a(e) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + d++, e);
  }
  var d = 0;
  return a;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
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
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
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
    return b instanceof c ? b : new c(function(a, c) {
      a(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  d.prototype.asyncExecute = function(b) {
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
  d.prototype.asyncExecuteFunction = function(b) {
    f(b, 0);
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
        } catch (h) {
          this.asyncThrow_(h);
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
    var a = this.createResolveAndReject_();
    try {
      b(a.resolve, a.reject);
    } catch (g) {
      a.reject(g);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(b) {
        g || (g = !0, a.call(c, b));
      };
    }
    var c = this, g = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  c.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof c) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var b = null != a;
              break a;
            case "function":
              b = !0;
              break a;
            default:
              b = !1;
          }
        }
        b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (g) {
      this.reject_(g);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  c.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  c.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  c.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        k.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var k = new d;
  c.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, c) {
    var b = this.createResolveAndReject_();
    try {
      a.call(c, b.resolve, b.reject);
    } catch (h) {
      b.reject(h);
    }
  };
  c.prototype.then = function(a, d) {
    function b(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var e, f, l = new c(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(b(a, e), b(d, f));
    return l;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, c) {
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
    null == this.onSettledCallbacks_ ? k.asyncExecute(b) : this.onSettledCallbacks_.push(b);
  };
  c.resolve = e;
  c.reject = function(a) {
    return new c(function(b, c) {
      c(a);
    });
  };
  c.race = function(a) {
    return new c(function(b, c) {
      for (var d = $jscomp.makeIterator(a), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(b, c);
      }
    });
  };
  c.all = function(a) {
    var b = $jscomp.makeIterator(a), d = b.next();
    return d.done ? e([]) : new c(function(a, c) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, e(d.value).callWhenSettled_(f(g.length - 1), c), d = b.next();
      } while (!d.done);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  $jscomp.initSymbol();
  var a = Object.getOwnPropertyDescriptor(Promise, Symbol.species);
  $jscomp.initSymbol();
  return "get" in a && Promise[Symbol.species] === Promise;
};

