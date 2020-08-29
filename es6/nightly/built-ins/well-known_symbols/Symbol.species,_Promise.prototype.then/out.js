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
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var e = $jscomp.propertyToPolyfillSymbol[d];
  if (null == e) {
    return a[d];
  }
  e = a[e];
  return void 0 !== e ? e : a[d];
};
$jscomp.polyfill = function(a, d, e, g) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, e, g) : $jscomp.polyfillUnisolated(a, d, e, g));
};
$jscomp.polyfillUnisolated = function(a, d, e, g) {
  e = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var c = a[g];
    if (!(c in e)) {
      return;
    }
    e = e[c];
  }
  a = a[a.length - 1];
  g = e[a];
  d = d(g);
  d != g && null != d && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, e, g) {
  var c = a.split(".");
  a = 1 === c.length;
  g = c[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var n = 0; n < c.length - 1; n++) {
    var b = c[n];
    if (!(b in g)) {
      return;
    }
    g = g[b];
  }
  c = c[c.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? g[c] : null;
  d = d(e);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== e && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(g, c, {configurable:!0, writable:!0, value:d})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var d = function(c, n) {
    this.$jscomp$symbol$id_ = c;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:n});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var e = 0, g = function(c) {
    if (this instanceof g) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d("jscomp_symbol_" + (c || "") + "_" + e++, c);
  };
  return g;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var d = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < d.length; e++) {
    var g = $jscomp.global[d[e]];
    "function" === typeof g && "function" != typeof g.prototype[a] && $jscomp.defineProperty(g.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.initSymbolAsyncIterator = function() {
};
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function d() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof c ? b : new c(function(f, h) {
      f(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  d.prototype.asyncExecute = function(b) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
      });
    }
    this.batch_.push(b);
  };
  var g = $jscomp.global.setTimeout;
  d.prototype.asyncExecuteFunction = function(b) {
    g(b, 0);
  };
  d.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var b = this.batch_;
      this.batch_ = [];
      for (var f = 0; f < b.length; ++f) {
        var h = b[f];
        b[f] = null;
        try {
          h();
        } catch (k) {
          this.asyncThrow_(k);
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
    var f = this.createResolveAndReject_();
    try {
      b(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function b(k) {
      return function(l) {
        h || (h = !0, k.call(f, l));
      };
    }
    var f = this, h = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  c.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof c) {
        this.settleSameAsPromise_(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var f = null != b;
              break a;
            case "function":
              f = !0;
              break a;
            default:
              f = !1;
          }
        }
        f ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
      }
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(b) {
    var f = void 0;
    try {
      f = b.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, b) : this.fulfill_(b);
  };
  c.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  c.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  c.prototype.settle_ = function(b, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = f;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        n.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var n = new d;
  c.prototype.settleSameAsPromise_ = function(b) {
    var f = this.createResolveAndReject_();
    b.callWhenSettled_(f.resolve, f.reject);
  };
  c.prototype.settleSameAsThenable_ = function(b, f) {
    var h = this.createResolveAndReject_();
    try {
      b.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  c.prototype.then = function(b, f) {
    function h(m, p) {
      return "function" == typeof m ? function(q) {
        try {
          k(m(q));
        } catch (r) {
          l(r);
        }
      } : p;
    }
    var k, l, t = new c(function(m, p) {
      k = m;
      l = p;
    });
    this.callWhenSettled_(h(b, k), h(f, l));
    return t;
  };
  c.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  c.prototype.callWhenSettled_ = function(b, f) {
    function h() {
      switch(k.state_) {
        case 1:
          b(k.result_);
          break;
        case 2:
          f(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? n.asyncExecute(h) : this.onSettledCallbacks_.push(h);
  };
  c.resolve = e;
  c.reject = function(b) {
    return new c(function(f, h) {
      h(b);
    });
  };
  c.race = function(b) {
    return new c(function(f, h) {
      for (var k = $jscomp.makeIterator(b), l = k.next(); !l.done; l = k.next()) {
        e(l.value).callWhenSettled_(f, h);
      }
    });
  };
  c.all = function(b) {
    var f = $jscomp.makeIterator(b), h = f.next();
    return h.done ? e([]) : new c(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          p--;
          0 == p && k(m);
        };
      }
      var m = [], p = 0;
      do {
        m.push(void 0), p++, e(h.value).callWhenSettled_(t(m.length - 1), l), h = f.next();
      } while (!h.done);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  var a = new Promise(function(g) {
    g(42);
  }), d = a.constructor = function(g) {
    g(function() {
    }, function() {
    });
  }, e = function(g) {
    g(function() {
    }, function() {
    });
  };
  Object.defineProperty(d, Symbol.species, {value:e});
  return a.then(function() {
  }) instanceof e;
};

