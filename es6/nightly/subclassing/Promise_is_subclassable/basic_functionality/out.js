var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++],} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return c ? c.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.arrayFromIterator = function(b) {
  for (var c, d = []; !(c = b.next()).done;) {
    d.push(c.value);
  }
  return d;
};
$jscomp.arrayFromIterable = function(b) {
  return b instanceof Array ? b : $jscomp.arrayFromIterator($jscomp.makeIterator(b));
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(b) {
  var c = function() {
  };
  c.prototype = b;
  return new c();
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, d) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = d.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var c = 0; c < b.length; ++c) {
    var d = b[c];
    if (d && d.Math == Math) {
      return d;
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
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var d = $jscomp.propertyToPolyfillSymbol[c];
  if (null == d) {
    return b[c];
  }
  d = b[d];
  return void 0 !== d ? d : b[c];
};
$jscomp.polyfill = function(b, c, d, g) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, d, g) : $jscomp.polyfillUnisolated(b, c, d, g));
};
$jscomp.polyfillUnisolated = function(b, c, d, g) {
  d = $jscomp.global;
  b = b.split(".");
  for (g = 0; g < b.length - 1; g++) {
    var e = b[g];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  b = b[b.length - 1];
  g = d[b];
  c = c(g);
  c != g && null != c && $jscomp.defineProperty(d, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, d, g) {
  var e = b.split(".");
  b = 1 === e.length;
  g = e[0];
  g = !b && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < e.length - 1; m++) {
    var a = e[m];
    if (!(a in g)) {
      return;
    }
    g = g[a];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? g[e] : null;
  c = c(d);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (d = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + d + "$" + e), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:c})));
};
$jscomp.getConstructImplementation = function() {
  function b() {
    function d() {
    }
    new d();
    Reflect.construct(d, [], function() {
    });
    return new d() instanceof d;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (b()) {
      return Reflect.construct;
    }
    var c = Reflect.construct;
    return function(d, g, e) {
      d = c(d, g);
      e && Reflect.setPrototypeOf(d, e.prototype);
      return d;
    };
  }
  return function(d, g, e) {
    void 0 === e && (e = d);
    e = $jscomp.objectCreate(e.prototype || Object.prototype);
    return Function.prototype.apply.call(d, e, g) || e;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var b = {a:!0}, c = {};
  try {
    return c.__proto__ = b, c.a;
  } catch (d) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(b, c) {
  b.__proto__ = c;
  if (b.__proto__ !== c) {
    throw new TypeError(b + " is not extensible");
  }
  return b;
} : null;
$jscomp.inherits = function(b, c) {
  b.prototype = $jscomp.objectCreate(c.prototype);
  b.prototype.constructor = b;
  if ($jscomp.setPrototypeOf) {
    var d = $jscomp.setPrototypeOf;
    d(b, c);
  } else {
    for (d in c) {
      if ("prototype" != d) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(c, d);
          g && Object.defineProperty(b, d, g);
        } else {
          b[d] = c[d];
        }
      }
    }
  }
  b.superClass_ = c.prototype;
};
$jscomp.polyfill("Reflect", function(b) {
  return b ? b : {};
}, "es6", "es3");
$jscomp.polyfill("Reflect.construct", function(b) {
  return $jscomp.construct;
}, "es6", "es3");
$jscomp.polyfill("Reflect.setPrototypeOf", function(b) {
  if (b) {
    return b;
  }
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    return function(d, g) {
      try {
        return c(d, g), !0;
      } catch (e) {
        return !1;
      }
    };
  }
  return null;
}, "es6", "es5");
$jscomp.polyfill("Promise", function(b) {
  function c() {
    this.batch_ = null;
  }
  function d(a) {
    return a instanceof e ? a : new e(function(f, h) {
      f(a);
    });
  }
  if (b && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return b;
  }
  c.prototype.asyncExecute = function(a) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
      });
    }
    this.batch_.push(a);
  };
  var g = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var f = 0; f < a.length; ++f) {
        var h = a[f];
        a[f] = null;
        try {
          h();
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
  var e = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var f = this.createResolveAndReject_();
    try {
      a(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        h || (h = !0, k.call(f, l));
      };
    }
    var f = this, h = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  e.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (a instanceof e) {
      this.settleSameAsPromise_(a);
    } else {
      a: {
        switch(typeof a) {
          case "object":
            var f = null != a;
            break a;
          case "function":
            f = !0;
            break a;
          default:
            f = !1;
        }
      }
      f ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
    }
  };
  e.prototype.resolveToNonPromiseObj_ = function(a) {
    var f = void 0;
    try {
      f = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, a) : this.fulfill_(a);
  };
  e.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  e.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  e.prototype.settle_ = function(a, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = f;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  e.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    g(function() {
      if (a.notifyUnhandledRejection_()) {
        var f = $jscomp.global.console;
        "undefined" !== typeof f && f.error(a.result_);
      }
    }, 1);
  };
  e.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var a = $jscomp.global.CustomEvent, f = $jscomp.global.Event, h = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof a ? a = new a("unhandledrejection", {cancelable:!0}) : "function" === typeof f ? a = new f("unhandledrejection", {cancelable:!0}) : (a = $jscomp.global.document.createEvent("CustomEvent"), a.initCustomEvent("unhandledrejection", !1, !0, a));
    a.promise = this;
    a.reason = this.result_;
    return h(a);
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        m.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var m = new c();
  e.prototype.settleSameAsPromise_ = function(a) {
    var f = this.createResolveAndReject_();
    a.callWhenSettled_(f.resolve, f.reject);
  };
  e.prototype.settleSameAsThenable_ = function(a, f) {
    var h = this.createResolveAndReject_();
    try {
      a.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  e.prototype.then = function(a, f) {
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
    this.callWhenSettled_(h(a, k), h(f, l));
    return t;
  };
  e.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  e.prototype.callWhenSettled_ = function(a, f) {
    function h() {
      switch(k.state_) {
        case 1:
          a(k.result_);
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
  e.resolve = d;
  e.reject = function(a) {
    return new e(function(f, h) {
      h(a);
    });
  };
  e.race = function(a) {
    return new e(function(f, h) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        d(l.value).callWhenSettled_(f, h);
      }
    });
  };
  e.all = function(a) {
    var f = $jscomp.makeIterator(a), h = f.next();
    return h.done ? d([]) : new e(function(k, l) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, d(h.value).callWhenSettled_(t(n.length - 1), l), h = f.next();
      } while (!h.done);
    });
  };
  return e;
}, "es6", "es3");
module.exports = function(b) {
  function c(f) {
    a += "quux" === f;
    5 === a && b();
  }
  function d(f) {
    a = -Infinity;
  }
  var g = function() {
    return $jscomp.construct(Promise, arguments, this.constructor);
  };
  $jscomp.inherits(g, Promise);
  var e = new g(function(f, h) {
    f("foo");
  }), m = new g(function(f, h) {
    h("quux");
  }), a = +(e instanceof g);
  e.then(function(f) {
    a += "foo" === f;
    5 === a && b();
  }, d);
  m.then(d, c);
  e.catch(d);
  m.catch(c);
  e.then(function() {
    a += e.then() instanceof g && e.then() !== e;
    5 === a && b();
  });
};

