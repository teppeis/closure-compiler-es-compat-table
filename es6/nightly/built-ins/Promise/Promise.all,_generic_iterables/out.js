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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, f) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = f.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var d = 0; d < a.length; ++d) {
    var f = a[d];
    if (f && f.Math == Math) {
      return f;
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
  var f = $jscomp.propertyToPolyfillSymbol[d];
  if (null == f) {
    return a[d];
  }
  f = a[f];
  return void 0 !== f ? f : a[d];
};
$jscomp.polyfill = function(a, d, f, g) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, f, g) : $jscomp.polyfillUnisolated(a, d, f, g));
};
$jscomp.polyfillUnisolated = function(a, d, f, g) {
  f = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var c = a[g];
    if (!(c in f)) {
      return;
    }
    f = f[c];
  }
  a = a[a.length - 1];
  g = f[a];
  d = d(g);
  d != g && null != d && $jscomp.defineProperty(f, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, f, g) {
  var c = a.split(".");
  a = 1 === c.length;
  g = c[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < c.length - 1; l++) {
    var b = c[l];
    if (!(b in g)) {
      return;
    }
    g = g[b];
  }
  c = c[c.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? g[c] : null;
  d = d(f);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, c, {configurable:!0, writable:!0, value:d}) : d !== f && ($jscomp.propertyToPolyfillSymbol[c] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(c) : $jscomp.POLYFILL_PREFIX + c, c = $jscomp.propertyToPolyfillSymbol[c], $jscomp.defineProperty(g, c, {configurable:!0, writable:!0, value:d})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var d = function(c, l) {
    this.$jscomp$symbol$id_ = c;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:l});
  };
  d.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var f = 0, g = function(c) {
    if (this instanceof g) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d("jscomp_symbol_" + (c || "") + "_" + f++, c);
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
  for (var d = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), f = 0; f < d.length; f++) {
    var g = $jscomp.global[d[f]];
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
  function f(b) {
    return b instanceof c ? b : new c(function(e, h) {
      e(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  d.prototype.asyncExecute = function(b) {
    if (null == this.batch_) {
      this.batch_ = [];
      var e = this;
      this.asyncExecuteFunction(function() {
        e.executeBatch_();
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
      for (var e = 0; e < b.length; ++e) {
        var h = b[e];
        b[e] = null;
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
    var e = this.createResolveAndReject_();
    try {
      b(e.resolve, e.reject);
    } catch (h) {
      e.reject(h);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function b(k) {
      return function(m) {
        h || (h = !0, k.call(e, m));
      };
    }
    var e = this, h = !1;
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
              var e = null != b;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
      }
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(b) {
    var e = void 0;
    try {
      e = b.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof e ? this.settleSameAsThenable_(e, b) : this.fulfill_(b);
  };
  c.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  c.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  c.prototype.settle_ = function(b, e) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + e + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = e;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        l.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new d;
  c.prototype.settleSameAsPromise_ = function(b) {
    var e = this.createResolveAndReject_();
    b.callWhenSettled_(e.resolve, e.reject);
  };
  c.prototype.settleSameAsThenable_ = function(b, e) {
    var h = this.createResolveAndReject_();
    try {
      b.call(e, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  c.prototype.then = function(b, e) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          m(r);
        }
      } : p;
    }
    var k, m, t = new c(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(h(b, k), h(e, m));
    return t;
  };
  c.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  c.prototype.callWhenSettled_ = function(b, e) {
    function h() {
      switch(k.state_) {
        case 1:
          b(k.result_);
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
  c.resolve = f;
  c.reject = function(b) {
    return new c(function(e, h) {
      h(b);
    });
  };
  c.race = function(b) {
    return new c(function(e, h) {
      for (var k = $jscomp.makeIterator(b), m = k.next(); !m.done; m = k.next()) {
        f(m.value).callWhenSettled_(e, h);
      }
    });
  };
  c.all = function(b) {
    var e = $jscomp.makeIterator(b), h = e.next();
    return h.done ? f([]) : new c(function(k, m) {
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
  return c;
}, "es6", "es3");
module.exports = function(a) {
  module.exports._ = Symbol.iterator;
  var d = Promise.all(global.__createIterableObject([new Promise(function(c) {
    setTimeout(c, 2000, "foo");
  }), new Promise(function(c) {
    setTimeout(c, 1000, "bar");
  }), ])), f = Promise.all(global.__createIterableObject([new Promise(function(c, l) {
    setTimeout(l, 2000, "baz");
  }), new Promise(function(c, l) {
    setTimeout(l, 1000, "qux");
  }), ])), g = 0;
  d.then(function(c) {
    g += "foo,bar" === c + "";
    2 === g && a();
  });
  f.catch(function(c) {
    g += "qux" === c;
    2 === g && a();
  });
};

