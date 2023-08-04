var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  if (c) {
    return c.call(b);
  }
  if ("number" == typeof b.length) {
    return $jscomp.arrayIterator(b);
  }
  throw Error(String(b) + " is not an iterable or ArrayLike");
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var c = 0; c < b.length; ++c) {
    var d = b[c];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, d) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = d.value;
  return b;
};
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, c, d) {
  if (!d || null != b) {
    d = $jscomp.propertyToPolyfillSymbol[c];
    if (null == d) {
      return b[c];
    }
    d = b[d];
    return void 0 !== d ? d : b[c];
  }
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
  for (var l = 0; l < e.length - 1; l++) {
    var a = e[l];
    if (!(a in g)) {
      return;
    }
    g = g[a];
  }
  e = e[e.length - 1];
  d = $jscomp.IS_SYMBOL_NATIVE && "es6" === d ? g[e] : null;
  c = c(d);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:c}) : c !== d && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (d = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + d + "$" + e), $jscomp.defineProperty(g, $jscomp.propertyToPolyfillSymbol[e], {configurable:!0, writable:!0, value:c})));
};
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
      return function(m) {
        h || (h = !0, k.call(f, m));
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
        l.asyncExecute(this.onSettledCallbacks_[a]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new c();
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
          m(r);
        }
      } : p;
    }
    var k, m, t = new e(function(n, p) {
      k = n;
      m = p;
    });
    this.callWhenSettled_(h(a, k), h(f, m));
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
    null == this.onSettledCallbacks_ ? l.asyncExecute(h) : this.onSettledCallbacks_.push(h);
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
      for (var k = $jscomp.makeIterator(a), m = k.next(); !m.done; m = k.next()) {
        d(m.value).callWhenSettled_(f, h);
      }
    });
  };
  e.all = function(a) {
    var f = $jscomp.makeIterator(a), h = f.next();
    return h.done ? d([]) : new e(function(k, m) {
      function t(q) {
        return function(r) {
          n[q] = r;
          p--;
          0 == p && k(n);
        };
      }
      var n = [], p = 0;
      do {
        n.push(void 0), p++, d(h.value).callWhenSettled_(t(n.length - 1), m), h = f.next();
      } while (!h.done);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(b) {
  return b ? b : function(c, d, g) {
    d = null != d ? d : function(f) {
      return f;
    };
    var e = [], l = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
    if ("function" == typeof l) {
      c = l.call(c);
      for (var a = 0; !(l = c.next()).done;) {
        e.push(d.call(g, l.value, a++));
      }
    } else {
      for (l = c.length, a = 0; a < l; a++) {
        e.push(d.call(g, c[a], a));
      }
    }
    return e;
  };
}, "es6", "es3");
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(b) {
  var c = function() {
  };
  c.prototype = b;
  return new c();
};
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
$jscomp.polyfill("AggregateError", function(b) {
  if (b) {
    return b;
  }
  b = function(c, d) {
    d = Error(d);
    "stack" in d && (this.stack = d.stack);
    this.errors = c;
    this.message = d.message;
  };
  $jscomp.inherits(b, Error);
  b.prototype.name = "AggregateError";
  return b;
}, "es_2021", "es3");
$jscomp.polyfill("Promise.any", function(b) {
  return b ? b : function(c) {
    c instanceof Array || (c = Array.from(c));
    return Promise.all(c.map(function(d) {
      return Promise.resolve(d).then(function(g) {
        throw g;
      }, function(g) {
        return g;
      });
    })).then(function(d) {
      throw new AggregateError(d, "All promises were rejected");
    }, function(d) {
      return d;
    });
  };
}, "es_2021", "es3");
module.exports = function(b) {
  Promise.any([Promise.reject(1), Promise.resolve(2), Promise.resolve(3)]).then(function(c) {
    2 === c && b();
  });
};

