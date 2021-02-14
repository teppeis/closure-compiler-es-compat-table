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
$jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
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
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) {
    return a[b];
  }
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function(a, b, c, g) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, g) : $jscomp.polyfillUnisolated(a, b, c, g));
};
$jscomp.polyfillUnisolated = function(a, b, c, g) {
  c = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var e = a[g];
    if (!(e in c)) {
      return;
    }
    c = c[e];
  }
  a = a[a.length - 1];
  g = c[a];
  b = b(g);
  b != g && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, c, g) {
  var e = a.split(".");
  a = 1 === e.length;
  g = e[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var p = 0; p < e.length - 1; p++) {
    var d = e[p];
    if (!(d in g)) {
      return;
    }
    g = g[d];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? g[e] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== c && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(g, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function c() {
    }
    new c;
    Reflect.construct(c, [], function() {
    });
    return new c instanceof c;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var b = Reflect.construct;
    return function(c, g, e) {
      c = b(c, g);
      e && Reflect.setPrototypeOf(c, e.prototype);
      return c;
    };
  }
  return function(c, g, e) {
    void 0 === e && (e = c);
    e = $jscomp.objectCreate(e.prototype || Object.prototype);
    return Function.prototype.apply.call(c, e, g) || e;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (c) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
  a.__proto__ = b;
  if (a.__proto__ !== b) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, b) {
  a.prototype = $jscomp.objectCreate(b.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    c(a, b);
  } else {
    for (c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(b, c);
          g && Object.defineProperty(a, c, g);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
};
$jscomp.polyfill("Reflect", function(a) {
  return a ? a : {};
}, "es6", "es3");
$jscomp.polyfill("Reflect.construct", function(a) {
  return $jscomp.construct;
}, "es6", "es3");
$jscomp.polyfill("Reflect.setPrototypeOf", function(a) {
  if (a) {
    return a;
  }
  if ($jscomp.setPrototypeOf) {
    var b = $jscomp.setPrototypeOf;
    return function(c, g) {
      try {
        return b(c, g), !0;
      } catch (e) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function c(d) {
    return d instanceof e ? d : new e(function(f, h) {
      f(d);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(d) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
      });
    }
    this.batch_.push(d);
  };
  var g = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(d) {
    g(d, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var d = this.batch_;
      this.batch_ = [];
      for (var f = 0; f < d.length; ++f) {
        var h = d[f];
        d[f] = null;
        try {
          h();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(d) {
    this.asyncExecuteFunction(function() {
      throw d;
    });
  };
  var e = function(d) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var f = this.createResolveAndReject_();
    try {
      d(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function d(k) {
      return function(l) {
        h || (h = !0, k.call(f, l));
      };
    }
    var f = this, h = !1;
    return {resolve:d(this.resolveTo_), reject:d(this.reject_)};
  };
  e.prototype.resolveTo_ = function(d) {
    if (d === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (d instanceof e) {
        this.settleSameAsPromise_(d);
      } else {
        a: {
          switch(typeof d) {
            case "object":
              var f = null != d;
              break a;
            case "function":
              f = !0;
              break a;
            default:
              f = !1;
          }
        }
        f ? this.resolveToNonPromiseObj_(d) : this.fulfill_(d);
      }
    }
  };
  e.prototype.resolveToNonPromiseObj_ = function(d) {
    var f = void 0;
    try {
      f = d.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, d) : this.fulfill_(d);
  };
  e.prototype.reject_ = function(d) {
    this.settle_(2, d);
  };
  e.prototype.fulfill_ = function(d) {
    this.settle_(1, d);
  };
  e.prototype.settle_ = function(d, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + d + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = d;
    this.result_ = f;
    this.executeOnSettledCallbacks_();
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var d = 0; d < this.onSettledCallbacks_.length; ++d) {
        p.asyncExecute(this.onSettledCallbacks_[d]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new b;
  e.prototype.settleSameAsPromise_ = function(d) {
    var f = this.createResolveAndReject_();
    d.callWhenSettled_(f.resolve, f.reject);
  };
  e.prototype.settleSameAsThenable_ = function(d, f) {
    var h = this.createResolveAndReject_();
    try {
      d.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  e.prototype.then = function(d, f) {
    function h(m, n) {
      return "function" == typeof m ? function(q) {
        try {
          k(m(q));
        } catch (r) {
          l(r);
        }
      } : n;
    }
    var k, l, t = new e(function(m, n) {
      k = m;
      l = n;
    });
    this.callWhenSettled_(h(d, k), h(f, l));
    return t;
  };
  e.prototype.catch = function(d) {
    return this.then(void 0, d);
  };
  e.prototype.callWhenSettled_ = function(d, f) {
    function h() {
      switch(k.state_) {
        case 1:
          d(k.result_);
          break;
        case 2:
          f(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? p.asyncExecute(h) : this.onSettledCallbacks_.push(h);
  };
  e.resolve = c;
  e.reject = function(d) {
    return new e(function(f, h) {
      h(d);
    });
  };
  e.race = function(d) {
    return new e(function(f, h) {
      for (var k = $jscomp.makeIterator(d), l = k.next(); !l.done; l = k.next()) {
        c(l.value).callWhenSettled_(f, h);
      }
    });
  };
  e.all = function(d) {
    var f = $jscomp.makeIterator(d), h = f.next();
    return h.done ? c([]) : new e(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, c(h.value).callWhenSettled_(t(m.length - 1), l), h = f.next();
      } while (!h.done);
    });
  };
  return e;
}, "es6", "es3");
module.exports = function() {
  var a = function() {
    return $jscomp.construct(Promise, arguments, this.constructor);
  };
  $jscomp.inherits(a, Promise);
  var b = new a(function(c, g) {
    c("foo");
  });
  return b instanceof a && b instanceof Promise && Object.getPrototypeOf(a) === Promise;
};

