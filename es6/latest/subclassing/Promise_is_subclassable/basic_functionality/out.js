var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++],} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (d) {
    return d.call(a);
  }
  if ("number" == typeof a.length) {
    return $jscomp.arrayIterator(a);
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
};
$jscomp.arrayFromIterator = function(a) {
  for (var d, c = []; !(d = a.next()).done;) {
    c.push(d.value);
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
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var d = function() {
  };
  d.prototype = a;
  return new d();
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[d] = c.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var d = 0; d < a.length; ++d) {
    var c = a[d];
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
var $jscomp$lookupPolyfilledValue = function(a, d, c) {
  if (!c || null != a) {
    c = $jscomp.propertyToPolyfillSymbol[d];
    if (null == c) {
      return a[d];
    }
    c = a[c];
    return void 0 !== c ? c : a[d];
  }
};
$jscomp.polyfill = function(a, d, c, g) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, c, g) : $jscomp.polyfillUnisolated(a, d, c, g));
};
$jscomp.polyfillUnisolated = function(a, d, c, g) {
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
  d = d(g);
  d != g && null != d && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, c, g) {
  var e = a.split(".");
  a = 1 === e.length;
  g = e[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < e.length - 1; m++) {
    var b = e[m];
    if (!(b in g)) {
      return;
    }
    g = g[b];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? g[e] : null;
  d = d(c);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:d}) : d !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (c = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + c + "$" + e), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:d})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function c() {
    }
    new c();
    Reflect.construct(c, [], function() {
    });
    return new c() instanceof c;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var d = Reflect.construct;
    return function(c, g, e) {
      c = d(c, g);
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
  var a = {a:!0}, d = {};
  try {
    return d.__proto__ = a, d.a;
  } catch (c) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, d) {
  a.__proto__ = d;
  if (a.__proto__ !== d) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, d) {
  a.prototype = $jscomp.objectCreate(d.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    c(a, d);
  } else {
    for (c in d) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(d, c);
          g && Object.defineProperty(a, c, g);
        } else {
          a[c] = d[c];
        }
      }
    }
  }
  a.superClass_ = d.prototype;
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
    var d = $jscomp.setPrototypeOf;
    return function(c, g) {
      try {
        return d(c, g), !0;
      } catch (e) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.polyfill("Promise", function(a) {
  function d() {
    this.batch_ = null;
  }
  function c(b) {
    return b instanceof e ? b : new e(function(f, h) {
      f(b);
    });
  }
  if (a && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
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
  var e = function(b) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var f = this.createResolveAndReject_();
    try {
      b(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function b(k) {
      return function(l) {
        h || (h = !0, k.call(f, l));
      };
    }
    var f = this, h = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  e.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (b instanceof e) {
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
  };
  e.prototype.resolveToNonPromiseObj_ = function(b) {
    var f = void 0;
    try {
      f = b.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, b) : this.fulfill_(b);
  };
  e.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  e.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  e.prototype.settle_ = function(b, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = f;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  e.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var b = this;
    g(function() {
      if (b.notifyUnhandledRejection_()) {
        var f = $jscomp.global.console;
        "undefined" !== typeof f && f.error(b.result_);
      }
    }, 1);
  };
  e.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var b = $jscomp.global.CustomEvent, f = $jscomp.global.Event, h = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof b ? b = new b("unhandledrejection", {cancelable:!0}) : "function" === typeof f ? b = new f("unhandledrejection", {cancelable:!0}) : (b = $jscomp.global.document.createEvent("CustomEvent"), b.initCustomEvent("unhandledrejection", !1, !0, b));
    b.promise = this;
    b.reason = this.result_;
    return h(b);
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        m.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var m = new d();
  e.prototype.settleSameAsPromise_ = function(b) {
    var f = this.createResolveAndReject_();
    b.callWhenSettled_(f.resolve, f.reject);
  };
  e.prototype.settleSameAsThenable_ = function(b, f) {
    var h = this.createResolveAndReject_();
    try {
      b.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  e.prototype.then = function(b, f) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          l(r);
        }
      } : p;
    }
    var k, l, t = new e(function(n, p) {
      k = n;
      l = p;
    });
    this.callWhenSettled_(h(b, k), h(f, l));
    return t;
  };
  e.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  e.prototype.callWhenSettled_ = function(b, f) {
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
    null == this.onSettledCallbacks_ ? m.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  e.resolve = c;
  e.reject = function(b) {
    return new e(function(f, h) {
      h(b);
    });
  };
  e.race = function(b) {
    return new e(function(f, h) {
      for (var k = $jscomp.makeIterator(b), l = k.next(); !l.done; l = k.next()) {
        c(l.value).callWhenSettled_(f, h);
      }
    });
  };
  e.all = function(b) {
    var f = $jscomp.makeIterator(b), h = f.next();
    return h.done ? c([]) : new e(function(k, l) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, c(h.value).callWhenSettled_(t(n.length - 1), l), h = f.next();
      } while (!h.done);
    });
  };
  return e;
}, "es6", "es3");
module.exports = function(a) {
  function d(f) {
    b += "quux" === f;
    5 === b && a();
  }
  function c(f) {
    b = -Infinity;
  }
  var g = function() {
    return $jscomp.construct(Promise, arguments, this.constructor);
  };
  $jscomp.inherits(g, Promise);
  var e = new g(function(f, h) {
    f("foo");
  }), m = new g(function(f, h) {
    h("quux");
  }), b = +(e instanceof g);
  e.then(function(f) {
    b += "foo" === f;
    5 === b && a();
  }, c);
  m.then(c, d);
  e.catch(c);
  m.catch(d);
  e.then(function() {
    b += e.then() instanceof g && e.then() !== e;
    5 === b && a();
  });
};

