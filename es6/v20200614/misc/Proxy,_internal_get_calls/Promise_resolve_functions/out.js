var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
    if (d && d.Math == Math) {
      return d;
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = d.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var d = $jscomp.propertyToPolyfillSymbol[c];
  if (null == d) {
    return a[c];
  }
  d = a[d];
  return void 0 !== d ? d : a[c];
};
$jscomp.polyfill = function(a, c, d, f) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, d, f) : $jscomp.polyfillUnisolated(a, c, d, f));
};
$jscomp.polyfillUnisolated = function(a, c, d, f) {
  d = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var b = a[f];
    if (!(b in d)) {
      return;
    }
    d = d[b];
  }
  a = a[a.length - 1];
  f = d[a];
  c = c(f);
  c != f && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, d, f) {
  var b = a.split(".");
  a = 1 === b.length;
  f = b[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < b.length - 1; g++) {
    var e = b[g];
    if (!(e in f)) {
      return;
    }
    f = f[e];
  }
  b = b[b.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? f[b] : null;
  c = c(d);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, b, {configurable:!0, writable:!0, value:c}) : c !== d && ($jscomp.propertyToPolyfillSymbol[b] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(b) : $jscomp.POLYFILL_PREFIX + b, b = $jscomp.propertyToPolyfillSymbol[b], $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:c})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function d(e) {
    return e instanceof b ? e : new b(function(a, b) {
      a(e);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(e) {
    if (null == this.batch_) {
      this.batch_ = [];
      var a = this;
      this.asyncExecuteFunction(function() {
        a.executeBatch_();
      });
    }
    this.batch_.push(e);
  };
  var f = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(e) {
    f(e, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var e = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < e.length; ++a) {
        var b = e[a];
        e[a] = null;
        try {
          b();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(e) {
    this.asyncExecuteFunction(function() {
      throw e;
    });
  };
  var b = function(e) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      e(a.resolve, a.reject);
    } catch (h) {
      a.reject(h);
    }
  };
  b.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(e) {
        c || (c = !0, a.call(b, e));
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
              var e = null != a;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(a) {
    var e = void 0;
    try {
      e = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof e ? this.settleSameAsThenable_(e, a) : this.fulfill_(a);
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
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  b.prototype.then = function(a, c) {
    function e(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          d(a(b));
        } catch (m) {
          f(m);
        }
      } : b;
    }
    var d, f, l = new b(function(a, b) {
      d = a;
      f = b;
    });
    this.callWhenSettled_(e(a, d), e(c, f));
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
  b.resolve = d;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f = e.next()) {
        d(f.value).callWhenSettled_(b, c);
      }
    });
  };
  b.all = function(a) {
    var c = $jscomp.makeIterator(a), e = c.next();
    return e.done ? d([]) : new b(function(a, b) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, d(e.value).callWhenSettled_(f(g.length - 1), b), e = c.next();
      } while (!e.done);
    });
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = [], c = new Proxy({}, {get:function(c, f) {
    a.push(f);
    return c[f];
  }});
  new Promise(function(a) {
    a(c);
  });
  return "then" === a + "";
};

