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
  for (var c, d = []; !(c = a.next()).done;) {
    d.push(c.value);
  }
  return d;
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
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var c = function() {
  };
  c.prototype = a;
  return new c;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[c] = d.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
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
var $jscomp$lookupPolyfilledValue = function(a, c) {
  var d = $jscomp.propertyToPolyfillSymbol[c];
  if (null == d) {
    return a[c];
  }
  d = a[d];
  return void 0 !== d ? d : a[c];
};
$jscomp.polyfill = function(a, c, d, g) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, d, g) : $jscomp.polyfillUnisolated(a, c, d, g));
};
$jscomp.polyfillUnisolated = function(a, c, d, g) {
  d = $jscomp.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var e = a[g];
    if (!(e in d)) {
      return;
    }
    d = d[e];
  }
  a = a[a.length - 1];
  g = d[a];
  c = c(g);
  c != g && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(a, c, d, g) {
  var e = a.split(".");
  a = 1 === e.length;
  g = e[0];
  g = !a && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var p = 0; p < e.length - 1; p++) {
    var b = e[p];
    if (!(b in g)) {
      return;
    }
    g = g[b];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? g[e] : null;
  c = c(d);
  null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== d && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(g, e, {configurable:!0, writable:!0, value:c})));
};
$jscomp.getConstructImplementation = function() {
  function a() {
    function d() {
    }
    new d;
    Reflect.construct(d, [], function() {
    });
    return new d instanceof d;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
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
  var a = {a:!0}, c = {};
  try {
    return c.__proto__ = a, c.a;
  } catch (d) {
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
    var d = $jscomp.setPrototypeOf;
    d(a, c);
  } else {
    for (d in c) {
      if ("prototype" != d) {
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(c, d);
          g && Object.defineProperty(a, d, g);
        } else {
          a[d] = c[d];
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
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function d(b) {
    return b instanceof e ? b : new e(function(f, h) {
      f(b);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
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
    } else {
      if (b instanceof e) {
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
        p.asyncExecute(this.onSettledCallbacks_[b]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var p = new c;
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
    null == this.onSettledCallbacks_ ? p.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  e.resolve = d;
  e.reject = function(b) {
    return new e(function(f, h) {
      h(b);
    });
  };
  e.race = function(b) {
    return new e(function(f, h) {
      for (var k = $jscomp.makeIterator(b), l = k.next(); !l.done; l = k.next()) {
        d(l.value).callWhenSettled_(f, h);
      }
    });
  };
  e.all = function(b) {
    var f = $jscomp.makeIterator(b), h = f.next();
    return h.done ? d([]) : new e(function(k, l) {
      function t(q) {
        return function(r) {
          m[q] = r;
          n--;
          0 == n && k(m);
        };
      }
      var m = [], n = 0;
      do {
        m.push(void 0), n++, d(h.value).callWhenSettled_(t(m.length - 1), l), h = f.next();
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
  var c = new a(function(d, g) {
    d("foo");
  });
  return c instanceof a && c instanceof Promise && Object.getPrototypeOf(a) === Promise;
};

