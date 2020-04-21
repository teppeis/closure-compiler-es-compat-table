var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var a = 0;
  return function() {
    return a < b.length ? {done:!1, value:b[a++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var a = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return a ? a.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var a = 0; a < b.length; ++a) {
    var e = b[a];
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, e) {
  b != Array.prototype && b != Object.prototype && (b[a] = e.value);
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = $jscomp.ISOLATE_POLYFILLS && "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(b, a) {
  var e = $jscomp.propertyToPolyfillSymbol[a];
  if (null == e) {
    return b[a];
  }
  e = b[e];
  return void 0 !== e ? e : b[a];
};
$jscomp.polyfill = function(b, a, e, f) {
  a && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, a, e, f) : $jscomp.polyfillUnisolated(b, a, e, f));
};
$jscomp.polyfillUnisolated = function(b, a, e, f) {
  e = $jscomp.global;
  b = b.split(".");
  for (f = 0; f < b.length - 1; f++) {
    var c = b[f];
    c in e || (e[c] = {});
    e = e[c];
  }
  b = b[b.length - 1];
  f = e[b];
  a = a(f);
  a != f && null != a && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:a});
};
$jscomp.polyfillIsolated = function(b, a, e, f) {
  var c = b.split(".");
  b = 1 === c.length;
  f = c[0];
  f = !b && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < c.length - 1; g++) {
    var d = c[g];
    d in f || (f[d] = {});
    f = f[d];
  }
  c = c[c.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? f[c] : null;
  a = a(e);
  null != a && (b ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:a}) : a !== e && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(f, c, {configurable:!0, writable:!0, value:a})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(b) {
  function a() {
    this.batch_ = null;
  }
  function e(d) {
    return d instanceof c ? d : new c(function(a, c) {
      a(d);
    });
  }
  if (b && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return b;
  }
  a.prototype.asyncExecute = function(d) {
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
  a.prototype.asyncExecuteFunction = function(d) {
    f(d, 0);
  };
  a.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var d = this.batch_;
      this.batch_ = [];
      for (var a = 0; a < d.length; ++a) {
        var c = d[a];
        d[a] = null;
        try {
          c();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  a.prototype.asyncThrow_ = function(d) {
    this.asyncExecuteFunction(function() {
      throw d;
    });
  };
  var c = function(d) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var a = this.createResolveAndReject_();
    try {
      d(a.resolve, a.reject);
    } catch (h) {
      a.reject(h);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        b || (b = !0, a.call(c, d));
      };
    }
    var c = this, b = !1;
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
  c.prototype.resolveToNonPromiseObj_ = function(a) {
    var d = void 0;
    try {
      d = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof d ? this.settleSameAsThenable_(d, a) : this.fulfill_(a);
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
        g.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new a;
  c.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, c) {
    var b = this.createResolveAndReject_();
    try {
      a.call(c, b.resolve, b.reject);
    } catch (k) {
      b.reject(k);
    }
  };
  c.prototype.then = function(a, b) {
    function d(a, c) {
      return "function" == typeof a ? function(c) {
        try {
          e(a(c));
        } catch (l) {
          f(l);
        }
      } : c;
    }
    var e, f, g = new c(function(a, c) {
      e = a;
      f = c;
    });
    this.callWhenSettled_(d(a, e), d(b, f));
    return g;
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
    null == this.onSettledCallbacks_ ? g.asyncExecute(b) : this.onSettledCallbacks_.push(b);
  };
  c.resolve = e;
  c.reject = function(a) {
    return new c(function(c, b) {
      b(a);
    });
  };
  c.race = function(a) {
    return new c(function(c, b) {
      for (var d = $jscomp.makeIterator(a), f = d.next(); !f.done; f = d.next()) {
        e(f.value).callWhenSettled_(c, b);
      }
    });
  };
  c.all = function(a) {
    var b = $jscomp.makeIterator(a), d = b.next();
    return d.done ? e([]) : new c(function(a, c) {
      function f(c) {
        return function(b) {
          g[c] = b;
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
$jscomp.polyfill("Array.from", function(b) {
  return b ? b : function(a, b, f) {
    b = null != b ? b : function(a) {
      return a;
    };
    var c = [], e = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    if ("function" == typeof e) {
      a = e.call(a);
      for (var d = 0; !(e = a.next()).done;) {
        c.push(b.call(f, e.value, d++));
      }
    } else {
      for (e = a.length, d = 0; d < e; d++) {
        c.push(b.call(f, a[d], d));
      }
    }
    return c;
  };
}, "es6", "es3");
$jscomp.polyfill("Promise.allSettled", function(b) {
  function a(a) {
    return {status:"fulfilled", value:a};
  }
  function e(a) {
    return {status:"rejected", reason:a};
  }
  return b ? b : function(b) {
    var c = this;
    b = Array.from(b, function(b) {
      return c.resolve(b).then(a, e);
    });
    return c.all(b);
  };
}, "es_2020", "es3");
module.exports = function(b) {
  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function(a) {
    3 === a.length && "fulfilled" === a[0].status && 1 === a[0].value && "rejected" === a[1].status && 2 === a[1].reason && "fulfilled" === a[2].status && 3 === a[2].value && b();
  });
};

