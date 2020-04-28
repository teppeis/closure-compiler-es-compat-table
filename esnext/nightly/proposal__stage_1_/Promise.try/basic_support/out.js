var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var d = 0;
  return function() {
    return d < b.length ? {done:!1, value:b[d++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return d ? d.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var d = 0; d < b.length; ++d) {
    var e = b[d];
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
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, e) {
  b != Array.prototype && b != Object.prototype && (b[d] = e.value);
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(b, d) {
  var e = $jscomp.propertyToPolyfillSymbol[d];
  if (null == e) {
    return b[d];
  }
  e = b[e];
  return void 0 !== e ? e : b[d];
};
$jscomp.polyfill = function(b, d, e, f) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, d, e, f) : $jscomp.polyfillUnisolated(b, d, e, f));
};
$jscomp.polyfillUnisolated = function(b, d, e, f) {
  e = $jscomp.global;
  b = b.split(".");
  for (f = 0; f < b.length - 1; f++) {
    var a = b[f];
    a in e || (e[a] = {});
    e = e[a];
  }
  b = b[b.length - 1];
  f = e[b];
  d = d(f);
  d != f && null != d && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(b, d, e, f) {
  var a = b.split(".");
  b = 1 === a.length;
  f = a[0];
  f = !b && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < a.length - 1; g++) {
    var c = a[g];
    c in f || (f[c] = {});
    f = f[c];
  }
  a = a[a.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? f[a] : null;
  d = d(e);
  null != d && (b ? $jscomp.defineProperty($jscomp.polyfills, a, {configurable:!0, writable:!0, value:d}) : d !== e && ($jscomp.propertyToPolyfillSymbol[a] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(a) : $jscomp.POLYFILL_PREFIX + a, a = $jscomp.propertyToPolyfillSymbol[a], $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:d})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function d() {
    this.batch_ = null;
  }
  function e(c) {
    return c instanceof a ? c : new a(function(a, b) {
      a(c);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return b;
  }
  d.prototype.asyncExecute = function(c) {
    if (null == this.batch_) {
      this.batch_ = [];
      var a = this;
      this.asyncExecuteFunction(function() {
        a.executeBatch_();
      });
    }
    this.batch_.push(c);
  };
  var f = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(c) {
    f(c, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var c = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < c.length; ++a) {
        var b = c[a];
        c[a] = null;
        try {
          b();
        } catch (k) {
          this.asyncThrow_(k);
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
  var a = function(c) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      c(a.resolve, a.reject);
    } catch (h) {
      a.reject(h);
    }
  };
  a.prototype.createResolveAndReject_ = function() {
    function c(c) {
      return function(d) {
        b || (b = !0, c.call(a, d));
      };
    }
    var a = this, b = !1;
    return {resolve:c(this.resolveTo_), reject:c(this.reject_)};
  };
  a.prototype.resolveTo_ = function(c) {
    if (c === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (c instanceof a) {
        this.settleSameAsPromise_(c);
      } else {
        a: {
          switch(typeof c) {
            case "object":
              var b = null != c;
              break a;
            case "function":
              b = !0;
              break a;
            default:
              b = !1;
          }
        }
        b ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c);
      }
    }
  };
  a.prototype.resolveToNonPromiseObj_ = function(c) {
    var a = void 0;
    try {
      a = c.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof a ? this.settleSameAsThenable_(a, c) : this.fulfill_(c);
  };
  a.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  a.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  a.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  a.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        g.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new d;
  a.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  a.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  a.prototype.then = function(b, d) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var e, f, l = new a(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(c(b, e), c(d, f));
    return l;
  };
  a.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  a.prototype.callWhenSettled_ = function(a, b) {
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
    null == this.onSettledCallbacks_ ? g.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  a.resolve = e;
  a.reject = function(b) {
    return new a(function(a, c) {
      c(b);
    });
  };
  a.race = function(b) {
    return new a(function(a, c) {
      for (var d = $jscomp.makeIterator(b), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(a, c);
      }
    });
  };
  a.all = function(b) {
    var d = $jscomp.makeIterator(b), c = d.next();
    return c.done ? e([]) : new a(function(a, b) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, e(c.value).callWhenSettled_(f(g.length - 1), b), c = d.next();
      } while (!c.done);
    });
  };
  return a;
}, "es6", "es3");
module.exports = function() {
  return "function" === typeof Promise.try;
};

