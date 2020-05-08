var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var d = 0; d < a.length; ++d) {
    var e = a[d];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = e.value;
  return a;
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var e = $jscomp.propertyToPolyfillSymbol[d];
  if (null == e) {
    return a[d];
  }
  e = a[e];
  return void 0 !== e ? e : a[d];
};
$jscomp.polyfill = function(a, d, e, f) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, e, f) : $jscomp.polyfillUnisolated(a, d, e, f));
};
$jscomp.polyfillUnisolated = function(a, d, e, f) {
  e = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var b = a[f];
    b in e || (e[b] = {});
    e = e[b];
  }
  a = a[a.length - 1];
  f = e[a];
  d = d(f);
  d != f && null != d && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, e, f) {
  var b = a.split(".");
  a = 1 === b.length;
  f = b[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < b.length - 1; g++) {
    var c = b[g];
    c in f || (f[c] = {});
    f = f[c];
  }
  b = b[b.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? f[b] : null;
  d = d(e);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, b, {configurable:!0, writable:!0, value:d}) : d !== e && ($jscomp.propertyToPolyfillSymbol[b] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(b) : $jscomp.POLYFILL_PREFIX + b, b = $jscomp.propertyToPolyfillSymbol[b], $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:d})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function d() {
    this.batch_ = null;
  }
  function e(c) {
    return c instanceof b ? c : new b(function(a, b) {
      a(c);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
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
  var b = function(c) {
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
  b.prototype.createResolveAndReject_ = function() {
    function c(c) {
      return function(d) {
        b || (b = !0, c.call(a, d));
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
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var c = void 0;
    try {
      c = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a);
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
  var g = new d;
  b.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  b.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  b.prototype.then = function(a, d) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var e, f, l = new b(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(c(a, e), c(d, f));
    return l;
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
    null == this.onSettledCallbacks_ ? g.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  b.resolve = e;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var d = $jscomp.makeIterator(a), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(b, c);
      }
    });
  };
  b.all = function(a) {
    var d = $jscomp.makeIterator(a), c = d.next();
    return c.done ? e([]) : new b(function(a, b) {
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
  return b;
}, "es6", "es3");
module.exports = function() {
  new Promise(function() {
  });
  try {
    Promise.prototype.then(function() {
    });
  } catch (a) {
    return !0;
  }
};

