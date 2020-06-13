var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++], } : {done:!0};
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
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < b.length; ++c) {
    var d = b[c];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, d) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = d.value;
  return b;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var d = $jscomp.propertyToPolyfillSymbol[c];
  if (null == d) {
    return b[c];
  }
  d = b[d];
  return void 0 !== d ? d : b[c];
};
$jscomp.polyfill = function(b, c, d, e) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, d, e) : $jscomp.polyfillUnisolated(b, c, d, e));
};
$jscomp.polyfillUnisolated = function(b, c, d, e) {
  d = $jscomp.global;
  b = b.split(".");
  for (e = 0; e < b.length - 1; e++) {
    var a = b[e];
    if (!(a in d)) {
      return;
    }
    d = d[a];
  }
  b = b[b.length - 1];
  e = d[b];
  c = c(e);
  c != e && null != c && $jscomp.defineProperty(d, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, d, e) {
  var a = b.split(".");
  b = 1 === a.length;
  e = a[0];
  e = !b && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < a.length - 1; g++) {
    var f = a[g];
    if (!(f in e)) {
      return;
    }
    e = e[f];
  }
  a = a[a.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? e[a] : null;
  c = c(d);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, a, {configurable:!0, writable:!0, value:c}) : c !== d && ($jscomp.propertyToPolyfillSymbol[a] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(a) : $jscomp.POLYFILL_PREFIX + a, a = $jscomp.propertyToPolyfillSymbol[a], $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:c})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function c() {
    this.batch_ = null;
  }
  function d(f) {
    return f instanceof a ? f : new a(function(a, b) {
      a(f);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return b;
  }
  c.prototype.asyncExecute = function(f) {
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
  c.prototype.asyncExecuteFunction = function(f) {
    e(f, 0);
  };
  c.prototype.executeBatch_ = function() {
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
  c.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var a = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var f = this.createResolveAndReject_();
    try {
      a(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  };
  a.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(f) {
        c || (c = !0, a.call(b, f));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  a.prototype.resolveTo_ = function(f) {
    if (f === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (f instanceof a) {
        this.settleSameAsPromise_(f);
      } else {
        a: {
          switch(typeof f) {
            case "object":
              var b = null != f;
              break a;
            case "function":
              b = !0;
              break a;
            default:
              b = !1;
          }
        }
        b ? this.resolveToNonPromiseObj_(f) : this.fulfill_(f);
      }
    }
  };
  a.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
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
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  a.prototype.then = function(b, c) {
    function f(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          d(a(b));
        } catch (l) {
          e(l);
        }
      } : b;
    }
    var d, e, g = new a(function(a, b) {
      d = a;
      e = b;
    });
    this.callWhenSettled_(f(b, d), f(c, e));
    return g;
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
  a.resolve = d;
  a.reject = function(b) {
    return new a(function(a, c) {
      c(b);
    });
  };
  a.race = function(b) {
    return new a(function(a, c) {
      for (var f = $jscomp.makeIterator(b), e = f.next(); !e.done; e = f.next()) {
        d(e.value).callWhenSettled_(a, c);
      }
    });
  };
  a.all = function(b) {
    var c = $jscomp.makeIterator(b), e = c.next();
    return e.done ? d([]) : new a(function(a, b) {
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
  return a;
}, "es6", "es3");
module.exports = function(b) {
  var c = Promise.race([new Promise(function(a) {
    setTimeout(a, 1000, "foo");
  }), new Promise(function(a, b) {
    setTimeout(b, 2000, "bar");
  }), ]), d = Promise.race([new Promise(function(a, b) {
    setTimeout(b, 1000, "baz");
  }), new Promise(function(a) {
    setTimeout(a, 2000, "qux");
  }), ]), e = 0;
  c.then(function(a) {
    e += "foo" === a;
    2 === e && b();
  });
  d.catch(function(a) {
    e += "baz" === a;
    2 === e && b();
  });
};

