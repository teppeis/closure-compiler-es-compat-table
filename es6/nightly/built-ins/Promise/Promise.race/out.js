var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return c ? c.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < b.length; ++c) {
    var e = b[c];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, e) {
  b != Array.prototype && b != Object.prototype && (b[c] = e.value);
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var e = $jscomp.propertyToPolyfillSymbol[c];
  if (null == e) {
    return b[c];
  }
  e = b[e];
  return void 0 !== e ? e : b[c];
};
$jscomp.polyfill = function(b, c, e, f) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, e, f) : $jscomp.polyfillUnisolated(b, c, e, f));
};
$jscomp.polyfillUnisolated = function(b, c, e, f) {
  e = $jscomp.global;
  b = b.split(".");
  for (f = 0; f < b.length - 1; f++) {
    var a = b[f];
    a in e || (e[a] = {});
    e = e[a];
  }
  b = b[b.length - 1];
  f = e[b];
  c = c(f);
  c != f && null != c && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, e, f) {
  var a = b.split(".");
  b = 1 === a.length;
  f = a[0];
  f = !b && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < a.length - 1; g++) {
    var d = a[g];
    d in f || (f[d] = {});
    f = f[d];
  }
  a = a[a.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? f[a] : null;
  c = c(e);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, a, {configurable:!0, writable:!0, value:c}) : c !== e && ($jscomp.propertyToPolyfillSymbol[a] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(a) : $jscomp.POLYFILL_PREFIX + a, a = $jscomp.propertyToPolyfillSymbol[a], $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:c})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function c() {
    this.batch_ = null;
  }
  function e(d) {
    return d instanceof a ? d : new a(function(a, b) {
      a(d);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return b;
  }
  c.prototype.asyncExecute = function(d) {
    if (null == this.batch_) {
      this.batch_ = [];
      var a = this;
      this.asyncExecuteFunction(function() {
        a.executeBatch_();
      });
    }
    this.batch_.push(d);
  };
  var f = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(d) {
    f(d, 0);
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
        } catch (k) {
          this.asyncThrow_(k);
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
  var a = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var d = this.createResolveAndReject_();
    try {
      a(d.resolve, d.reject);
    } catch (h) {
      d.reject(h);
    }
  };
  a.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        c || (c = !0, a.call(b, d));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  a.prototype.resolveTo_ = function(d) {
    if (d === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (d instanceof a) {
        this.settleSameAsPromise_(d);
      } else {
        a: {
          switch(typeof d) {
            case "object":
              var b = null != d;
              break a;
            case "function":
              b = !0;
              break a;
            default:
              b = !1;
          }
        }
        b ? this.resolveToNonPromiseObj_(d) : this.fulfill_(d);
      }
    }
  };
  a.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
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
  var g = new c;
  a.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  a.prototype.settleSameAsThenable_ = function(a, b) {
    var d = this.createResolveAndReject_();
    try {
      a.call(b, d.resolve, d.reject);
    } catch (k) {
      d.reject(k);
    }
  };
  a.prototype.then = function(b, c) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (l) {
          f(l);
        }
      } : b;
    }
    var e, f, g = new a(function(a, b) {
      e = a;
      f = b;
    });
    this.callWhenSettled_(d(b, e), d(c, f));
    return g;
  };
  a.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  a.prototype.callWhenSettled_ = function(a, b) {
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
    var c = $jscomp.makeIterator(b), d = c.next();
    return d.done ? e([]) : new a(function(a, b) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, e(d.value).callWhenSettled_(f(g.length - 1), b), d = c.next();
      } while (!d.done);
    });
  };
  return a;
}, "es6", "es3");
module.exports = function(b) {
  var c = Promise.race([new Promise(function(a) {
    setTimeout(a, 1000, "foo");
  }), new Promise(function(a, b) {
    setTimeout(b, 2000, "bar");
  })]), e = Promise.race([new Promise(function(a, b) {
    setTimeout(b, 1000, "baz");
  }), new Promise(function(a) {
    setTimeout(a, 2000, "qux");
  })]), f = 0;
  c.then(function(a) {
    f += "foo" === a;
    2 === f && b();
  });
  e.catch(function(a) {
    f += "baz" === a;
    2 === f && b();
  });
};

