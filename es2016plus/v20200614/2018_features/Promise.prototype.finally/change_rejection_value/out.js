var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = d.value;
  return a;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var d = $jscomp.propertyToPolyfillSymbol[b];
  if (null == d) {
    return a[b];
  }
  d = a[d];
  return void 0 !== d ? d : a[b];
};
$jscomp.polyfill = function(a, b, d, e) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, d, e) : $jscomp.polyfillUnisolated(a, b, d, e));
};
$jscomp.polyfillUnisolated = function(a, b, d, e) {
  d = $jscomp.global;
  a = a.split(".");
  for (e = 0; e < a.length - 1; e++) {
    var c = a[e];
    if (!(c in d)) {
      return;
    }
    d = d[c];
  }
  a = a[a.length - 1];
  e = d[a];
  b = b(e);
  b != e && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, d, e) {
  var c = a.split(".");
  a = 1 === c.length;
  e = c[0];
  e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < c.length - 1; g++) {
    var f = c[g];
    if (!(f in e)) {
      return;
    }
    e = e[f];
  }
  c = c[c.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? e[c] : null;
  b = b(d);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:b}) : b !== d && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:b})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function d(f) {
    return f instanceof c ? f : new c(function(a, b) {
      a(f);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(f) {
    if (null == this.batch_) {
      this.batch_ = [];
      var a = this;
      this.asyncExecuteFunction(function() {
        a.executeBatch_();
      });
    }
    this.batch_.push(f);
  };
  var e = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(f) {
    e(f, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var f = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < f.length; ++a) {
        var b = f[a];
        f[a] = null;
        try {
          b();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(f) {
    this.asyncExecuteFunction(function() {
      throw f;
    });
  };
  var c = function(f) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      f(a.resolve, a.reject);
    } catch (h) {
      a.reject(h);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(f) {
        c || (c = !0, a.call(b, f));
      };
    }
    var b = this, c = !1;
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
    } catch (h) {
      this.reject_(h);
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
  c.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        g.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new b;
  c.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  c.prototype.then = function(a, b) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (m) {
          e(m);
        }
      } : b;
    }
    var f, e, l = new c(function(a, b) {
      f = a;
      e = b;
    });
    this.callWhenSettled_(d(a, f), d(b, e));
    return l;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, b) {
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
  c.resolve = d;
  c.reject = function(a) {
    return new c(function(b, c) {
      c(a);
    });
  };
  c.race = function(a) {
    return new c(function(b, c) {
      for (var f = $jscomp.makeIterator(a), e = f.next(); !e.done; e = f.next()) {
        d(e.value).callWhenSettled_(b, c);
      }
    });
  };
  c.all = function(a) {
    var b = $jscomp.makeIterator(a), e = b.next();
    return e.done ? d([]) : new c(function(a, c) {
      function f(b) {
        return function(c) {
          g[b] = c;
          h--;
          0 == h && a(g);
        };
      }
      var g = [], h = 0;
      do {
        g.push(void 0), h++, d(e.value).callWhenSettled_(f(g.length - 1), c), e = b.next();
      } while (!e.done);
    });
  };
  return c;
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(a) {
  return a ? a : function(a) {
    return this.then(function(b) {
      return Promise.resolve(a()).then(function() {
        return b;
      });
    }, function(b) {
      return Promise.resolve(a()).then(function() {
        throw b;
      });
    });
  };
}, "es9", "es3");
module.exports = function(a) {
  var b = 0;
  Promise.reject("foobar").finally(function() {
    return Promise.reject("foo");
  }).catch(function(d) {
    b += "foo" === d;
    2 === b && a();
    return Promise.reject("foobar");
  }).finally(function() {
    throw Error("bar");
  }).catch(function(d) {
    b += "bar" === d.message;
    2 === b && a();
  });
};

