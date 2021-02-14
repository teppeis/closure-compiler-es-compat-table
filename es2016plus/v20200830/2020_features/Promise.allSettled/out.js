var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(c) {
  var b = 0;
  return function() {
    return b < c.length ? {done:!1, value:c[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(c) {
  return {next:$jscomp.arrayIteratorImpl(c)};
};
$jscomp.makeIterator = function(c) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
  return b ? b.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.getGlobal = function(c) {
  c = ["object" == typeof globalThis && globalThis, c, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < c.length; ++b) {
    var f = c[b];
    if (f && f.Math == Math) {
      return f;
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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, b, f) {
  if (c == Array.prototype || c == Object.prototype) {
    return c;
  }
  c[b] = f.value;
  return c;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(c, b) {
  var f = $jscomp.propertyToPolyfillSymbol[b];
  if (null == f) {
    return c[b];
  }
  f = c[f];
  return void 0 !== f ? f : c[b];
};
$jscomp.polyfill = function(c, b, f, g) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(c, b, f, g) : $jscomp.polyfillUnisolated(c, b, f, g));
};
$jscomp.polyfillUnisolated = function(c, b, f, g) {
  f = $jscomp.global;
  c = c.split(".");
  for (g = 0; g < c.length - 1; g++) {
    var d = c[g];
    if (!(d in f)) {
      return;
    }
    f = f[d];
  }
  c = c[c.length - 1];
  g = f[c];
  b = b(g);
  b != g && null != b && $jscomp.defineProperty(f, c, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(c, b, f, g) {
  var d = c.split(".");
  c = 1 === d.length;
  g = d[0];
  g = !c && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < d.length - 1; l++) {
    var a = d[l];
    if (!(a in g)) {
      return;
    }
    g = g[a];
  }
  d = d[d.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? g[d] : null;
  b = b(f);
  null != b && (c ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:b}) : b !== f && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(g, d, {configurable:!0, writable:!0, value:b})));
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(c) {
  function b() {
    this.batch_ = null;
  }
  function f(a) {
    return a instanceof d ? a : new d(function(e, h) {
      e(a);
    });
  }
  if (c && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return c;
  }
  b.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var e = this;
      this.asyncExecuteFunction(function() {
        e.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var g = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var e = 0; e < a.length; ++e) {
        var h = a[e];
        a[e] = null;
        try {
          h();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var d = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var e = this.createResolveAndReject_();
    try {
      a(e.resolve, e.reject);
    } catch (h) {
      e.reject(h);
    }
  };
  d.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(m) {
        h || (h = !0, k.call(e, m));
      };
    }
    var e = this, h = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  d.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof d) {
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
  d.prototype.resolveToNonPromiseObj_ = function(a) {
    var e = void 0;
    try {
      e = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof e ? this.settleSameAsThenable_(e, a) : this.fulfill_(a);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, e) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + e + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = e;
    this.executeOnSettledCallbacks_();
  };
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new b;
  d.prototype.settleSameAsPromise_ = function(a) {
    var e = this.createResolveAndReject_();
    a.callWhenSettled_(e.resolve, e.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, e) {
    var h = this.createResolveAndReject_();
    try {
      a.call(e, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  d.prototype.then = function(a, e) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var k, m, t = new d(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(h(a, k), h(e, m));
    return t;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, e) {
    function h() {
      switch(k.state_) {
        case 1:
          a(k.result_);
          break;
        case 2:
          e(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(h) : this.onSettledCallbacks_.push(h);
  };
  d.resolve = f;
  d.reject = function(a) {
    return new d(function(e, h) {
      h(a);
    });
  };
  d.race = function(a) {
    return new d(function(e, h) {
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        f(m.value).callWhenSettled_(e, h);
      }
    });
  };
  d.all = function(a) {
    var e = $jscomp.makeIterator(a), h = e.next();
    return h.done ? f([]) : new d(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, f(h.value).callWhenSettled_(t(n.length - 1), m), h = e.next();
      } while (!h.done);
    });
  };
  return d;
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(c) {
  return c ? c : function(b, f, g) {
    f = null != f ? f : function(e) {
      return e;
    };
    var d = [], l = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
    if ("function" == typeof l) {
      b = l.call(b);
      for (var a = 0; !(l = b.next()).done;) {
        d.push(f.call(g, l.value, a++));
      }
    } else {
      for (l = b.length, a = 0; a < l; a++) {
        d.push(f.call(g, b[a], a));
      }
    }
    return d;
  };
}, "es6", "es3");
$jscomp.polyfill("Promise.allSettled", function(c) {
  function b(g) {
    return {status:"fulfilled", value:g};
  }
  function f(g) {
    return {status:"rejected", reason:g};
  }
  return c ? c : function(g) {
    var d = this;
    g = Array.from(g, function(l) {
      return d.resolve(l).then(b, f);
    });
    return d.all(g);
  };
}, "es_2020", "es3");
module.exports = function(c) {
  Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(function(b) {
    3 === b.length && "fulfilled" === b[0].status && 1 === b[0].value && "rejected" === b[1].status && 2 === b[1].reason && "fulfilled" === b[2].status && 3 === b[2].value && c();
  });
};

