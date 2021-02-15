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
$jscomp.arrayFromIterator = function(b) {
  for (var c, e = []; !(c = b.next()).done;) {
    e.push(c.value);
  }
  return e;
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
  return new c;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, e) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = e.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < b.length; ++c) {
    var e = b[c];
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
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var e = $jscomp.propertyToPolyfillSymbol[c];
  if (null == e) {
    return b[c];
  }
  e = b[e];
  return void 0 !== e ? e : b[c];
};
$jscomp.polyfill = function(b, c, e, g) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, e, g) : $jscomp.polyfillUnisolated(b, c, e, g));
};
$jscomp.polyfillUnisolated = function(b, c, e, g) {
  e = $jscomp.global;
  b = b.split(".");
  for (g = 0; g < b.length - 1; g++) {
    var d = b[g];
    if (!(d in e)) {
      return;
    }
    e = e[d];
  }
  b = b[b.length - 1];
  g = e[b];
  c = c(g);
  c != g && null != c && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, e, g) {
  var d = b.split(".");
  b = 1 === d.length;
  g = d[0];
  g = !b && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < d.length - 1; m++) {
    var a = d[m];
    if (!(a in g)) {
      return;
    }
    g = g[a];
  }
  d = d[d.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? g[d] : null;
  c = c(e);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== e && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(g, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.getConstructImplementation = function() {
  function b() {
    function e() {
    }
    new e;
    Reflect.construct(e, [], function() {
    });
    return new e instanceof e;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (b()) {
      return Reflect.construct;
    }
    var c = Reflect.construct;
    return function(e, g, d) {
      e = c(e, g);
      d && Reflect.setPrototypeOf(e, d.prototype);
      return e;
    };
  }
  return function(e, g, d) {
    void 0 === d && (d = e);
    d = $jscomp.objectCreate(d.prototype || Object.prototype);
    return Function.prototype.apply.call(e, d, g) || d;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var b = {a:!0}, c = {};
  try {
    return c.__proto__ = b, c.a;
  } catch (e) {
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
    var e = $jscomp.setPrototypeOf;
    e(b, c);
  } else {
    for (e in c) {
      if ("prototype" != e) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(c, e);
          g && Object.defineProperty(b, e, g);
        } else {
          b[e] = c[e];
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
    return function(e, g) {
      try {
        return c(e, g), !0;
      } catch (d) {
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
  function e(a) {
    return a instanceof d ? a : new d(function(f, h) {
      f(a);
    });
  }
  if (b && !($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent)) {
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
  var d = function(a) {
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
  d.prototype.createResolveAndReject_ = function() {
    function a(k) {
      return function(l) {
        h || (h = !0, k.call(f, l));
      };
    }
    var f = this, h = !1;
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
    }
  };
  d.prototype.resolveToNonPromiseObj_ = function(a) {
    var f = void 0;
    try {
      f = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, a) : this.fulfill_(a);
  };
  d.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  d.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  d.prototype.settle_ = function(a, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = f;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  d.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var a = this;
    g(function() {
      if (a.notifyUnhandledRejection_()) {
        var f = $jscomp.global.console;
        "undefined" !== typeof f && f.error(a.result_);
      }
    }, 1);
  };
  d.prototype.notifyUnhandledRejection_ = function() {
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
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a) {
        m.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var m = new c;
  d.prototype.settleSameAsPromise_ = function(a) {
    var f = this.createResolveAndReject_();
    a.callWhenSettled_(f.resolve, f.reject);
  };
  d.prototype.settleSameAsThenable_ = function(a, f) {
    var h = this.createResolveAndReject_();
    try {
      a.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  d.prototype.then = function(a, f) {
    function h(n, p) {
      return "function" == typeof n ? function(q) {
        try {
          k(n(q));
        } catch (r) {
          l(r);
        }
      } : p;
    }
    var k, l, t = new d(function(n, p) {
      k = n;
      l = p;
    });
    this.callWhenSettled_(h(a, k), h(f, l));
    return t;
  };
  d.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  d.prototype.callWhenSettled_ = function(a, f) {
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
  d.resolve = e;
  d.reject = function(a) {
    return new d(function(f, h) {
      h(a);
    });
  };
  d.race = function(a) {
    return new d(function(f, h) {
      for (var k = $jscomp.makeIterator(a), l = k.next(); !l.done; l = k.next()) {
        e(l.value).callWhenSettled_(f, h);
      }
    });
  };
  d.all = function(a) {
    var f = $jscomp.makeIterator(a), h = f.next();
    return h.done ? e([]) : new d(function(k, l) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, e(h.value).callWhenSettled_(t(n.length - 1), l), h = f.next();
      } while (!h.done);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function(b) {
  function c(f) {
    a += "quux" === f;
    5 === a && b();
  }
  function e(f) {
    a = -Infinity;
  }
  var g = function() {
    return $jscomp.construct(Promise, arguments, this.constructor);
  };
  $jscomp.inherits(g, Promise);
  var d = new g(function(f, h) {
    f("foo");
  }), m = new g(function(f, h) {
    h("quux");
  }), a = +(d instanceof g);
  d.then(function(f) {
    a += "foo" === f;
    5 === a && b();
  }, e);
  m.then(e, c);
  d.catch(e);
  m.catch(c);
  d.then(function() {
    a += d.then() instanceof g && d.then() !== d;
    5 === a && b();
  });
};

