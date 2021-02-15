var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function(a) {
  for (var c, e = []; !(c = a.next()).done;) {
    e.push(c.value);
  }
  return e;
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
  var c = function() {
  };
  c.prototype = a;
  return new c;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = e.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var e = a[c];
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
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var e = $jscomp.propertyToPolyfillSymbol[c];
  if (null == e) {
    return a[c];
  }
  e = a[e];
  return void 0 !== e ? e : a[c];
};
$jscomp.polyfill = function(a, c, e, g) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, e, g) : $jscomp.polyfillUnisolated(a, c, e, g));
};
$jscomp.polyfillUnisolated = function(a, c, e, g) {
  e = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var d = a[g];
    if (!(d in e)) {
      return;
    }
    e = e[d];
  }
  a = a[a.length - 1];
  g = e[a];
  c = c(g);
  c != g && null != c && $jscomp.defineProperty(e, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, e, g) {
  var d = a.split(".");
  a = 1 === d.length;
  g = d[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var l = 0; l < d.length - 1; l++) {
    var b = d[l];
    if (!(b in g)) {
      return;
    }
    g = g[b];
  }
  d = d[d.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? g[d] : null;
  c = c(e);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== e && (void 0 === $jscomp.propertyToPolyfillSymbol[d] && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d), d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(g, d, {configurable:!0, writable:!0, value:c})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function e() {
    }
    new e;
    Reflect.construct(e, [], function() {
    });
    return new e instanceof e;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
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
  var a = {a:!0}, c = {};
  try {
    return c.__proto__ = a, c.a;
  } catch (e) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, c) {
  a.__proto__ = c;
  if (a.__proto__ !== c) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, c) {
  a.prototype = $jscomp.objectCreate(c.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var e = $jscomp.setPrototypeOf;
    e(a, c);
  } else {
    for (e in c) {
      if ("prototype" != e) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(c, e);
          g && Object.defineProperty(a, e, g);
        } else {
          a[e] = c[e];
        }
      }
    }
  }
  a.superClass_ = c.prototype;
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
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof d ? b : new d(function(f, h) {
      f(b);
    });
  }
  if (a && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return a;
  }
  c.prototype.asyncExecute = function(b) {
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
  c.prototype.asyncExecuteFunction = function(b) {
    g(b, 0);
  };
  c.prototype.executeBatch_ = function() {
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
  c.prototype.asyncThrow_ = function(b) {
    this.asyncExecuteFunction(function() {
      throw b;
    });
  };
  var d = function(b) {
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
  d.prototype.createResolveAndReject_ = function() {
    function b(k) {
      return function(m) {
        h || (h = !0, k.call(f, m));
      };
    }
    var f = this, h = !1;
    return {resolve:b(this.resolveTo_), reject:b(this.reject_)};
  };
  d.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof d) {
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
  d.prototype.resolveToNonPromiseObj_ = function(b) {
    var f = void 0;
    try {
      f = b.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, b) : this.fulfill_(b);
  };
  d.prototype.reject_ = function(b) {
    this.settle_(2, b);
  };
  d.prototype.fulfill_ = function(b) {
    this.settle_(1, b);
  };
  d.prototype.settle_ = function(b, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + b + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = b;
    this.result_ = f;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  d.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var b = this;
    g(function() {
      if (b.notifyUnhandledRejection_()) {
        var f = $jscomp.global.console;
        "undefined" !== typeof f && f.error(b.result_);
      }
    }, 1);
  };
  d.prototype.notifyUnhandledRejection_ = function() {
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
  d.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var b = 0; b < this.onSettledCallbacks_.length; ++b) {
        l.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new c;
  d.prototype.settleSameAsPromise_ = function(b) {
    var f = this.createResolveAndReject_();
    b.callWhenSettled_(f.resolve, f.reject);
  };
  d.prototype.settleSameAsThenable_ = function(b, f) {
    var h = this.createResolveAndReject_();
    try {
      b.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  d.prototype.then = function(b, f) {
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
    this.callWhenSettled_(h(b, k), h(f, m));
    return t;
  };
  d.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  d.prototype.callWhenSettled_ = function(b, f) {
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
    null == this.onSettledCallbacks_ ? l.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  d.resolve = e;
  d.reject = function(b) {
    return new d(function(f, h) {
      h(b);
    });
  };
  d.race = function(b) {
    return new d(function(f, h) {
      for (var k = $jscomp.makeIterator(b), m = k.next(); !m.done; m = k.next()) {
        e(m.value).callWhenSettled_(f, h);
      }
    });
  };
  d.all = function(b) {
    var f = $jscomp.makeIterator(b), h = f.next();
    return h.done ? e([]) : new d(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, e(h.value).callWhenSettled_(t(n.length - 1), m), h = f.next();
      } while (!h.done);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function(a) {
  var c = function() {
    return $jscomp.construct(Promise, arguments, this.constructor);
  };
  $jscomp.inherits(c, Promise);
  var e = c.all([new Promise(function(l) {
    setTimeout(l, 2000, "foo");
  }), new Promise(function(l) {
    setTimeout(l, 1000, "bar");
  }), ]), g = c.all([new Promise(function(l, b) {
    setTimeout(b, 2000, "baz");
  }), new Promise(function(l, b) {
    setTimeout(b, 1000, "qux");
  }), ]), d = +(e instanceof c);
  e.then(function(l) {
    d += "foo,bar" === l + "";
    3 === d && a();
  });
  g.catch(function(l) {
    d += "qux" === l;
    3 === d && a();
  });
};

