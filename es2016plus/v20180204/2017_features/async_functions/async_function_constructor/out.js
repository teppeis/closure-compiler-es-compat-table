var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(b) {
    return $jscomp.SYMBOL_PREFIX + (b || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(a) {
  var b = 0;
  return $jscomp.iteratorPrototype(function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, b, d, e) {
  if (b) {
    d = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var c = a[e];
      c in d || (d[c] = {});
      d = d[c];
    }
    a = a[a.length - 1];
    e = d[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function d(a) {
    return a instanceof c ? a : new c(function(b, f) {
      b(a);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(a) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this;
  };
  b.prototype.asyncExecuteBatch_ = function() {
    var a = this;
    this.asyncExecuteFunction(function() {
      a.executeBatch_();
    });
  };
  var e = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(a) {
    e(a, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var b = 0; b < a.length; ++b) {
        var f = a[b];
        delete a[b];
        try {
          f();
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
  var c = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject);
    } catch (f) {
      b.reject(f);
    }
  };
  c.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(d) {
        f || (f = !0, a.call(b, d));
      };
    }
    var b = this, f = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  c.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof c) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var b = null != a;
              break a;
            case "function":
              b = !0;
              break a;
            default:
              b = !1;
          }
        }
        b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  c.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (f) {
      this.reject_(f);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  c.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  c.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  c.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  c.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, b = 0; b < a.length; ++b) {
        a[b].call(), a[b] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var g = new b;
  c.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  c.prototype.settleSameAsThenable_ = function(a, b) {
    var f = this.createResolveAndReject_();
    try {
      a.call(b, f.resolve, f.reject);
    } catch (k) {
      f.reject(k);
    }
  };
  c.prototype.then = function(a, b) {
    function f(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          d(a(b));
        } catch (n) {
          e(n);
        }
      } : b;
    }
    var d, e, m = new c(function(a, b) {
      d = a;
      e = b;
    });
    this.callWhenSettled_(f(a, d), f(b, e));
    return m;
  };
  c.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  c.prototype.callWhenSettled_ = function(a, b) {
    function d() {
      switch(c.state_) {
        case 1:
          a(c.result_);
          break;
        case 2:
          b(c.result_);
          break;
        default:
          throw Error("Unexpected state: " + c.state_);
      }
    }
    var c = this;
    null == this.onSettledCallbacks_ ? g.asyncExecute(d) : this.onSettledCallbacks_.push(function() {
      g.asyncExecute(d);
    });
  };
  c.resolve = d;
  c.reject = function(a) {
    return new c(function(b, d) {
      d(a);
    });
  };
  c.race = function(a) {
    return new c(function(b, f) {
      for (var c = $jscomp.makeIterator(a), e = c.next(); !e.done; e = c.next()) {
        d(e.value).callWhenSettled_(b, f);
      }
    });
  };
  c.all = function(a) {
    var b = $jscomp.makeIterator(a), f = b.next();
    return f.done ? d([]) : new c(function(a, c) {
      function e(b) {
        return function(d) {
          k[b] = d;
          l--;
          0 == l && a(k);
        };
      }
      var k = [], l = 0;
      do {
        k.push(void 0), l++, d(f.value).callWhenSettled_(e(k.length - 1), c), f = b.next();
      } while (!f.done);
    });
  };
  return c;
}, "es6", "es3");
$jscomp.executeAsyncGenerator = function(a) {
  function b(b) {
    return a.next(b);
  }
  function d(b) {
    return a.throw(b);
  }
  return new Promise(function(e, c) {
    function g(a) {
      a.done ? e(a.value) : Promise.resolve(a.value).then(b, d).then(g, c);
    }
    g(a.next());
  });
};
$jscomp.iteratorFromArray = function(a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var d = 0, e = {next:function() {
    if (d < a.length) {
      var c = d++;
      return {value:b(c, a[c]), done:!1};
    }
    e.next = function() {
      return {done:!0, value:void 0};
    };
    return e.next();
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
};
$jscomp.polyfill("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, d) {
      return [a, d];
    });
  };
}, "es6", "es3");
$jscomp.findInternal = function(a, b, d) {
  a instanceof String && (a = String(a));
  for (var e = a.length, c = 0; c < e; c++) {
    var g = a[c];
    if (b.call(d, g, c, a)) {
      return {i:c, v:g};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, d, e) {
    $jscomp.initSymbolIterator();
    d = null != d ? d : function(a) {
      return a;
    };
    var b = [], g = a[Symbol.iterator];
    if ("function" == typeof g) {
      for (a = g.call(a); !(g = a.next()).done;) {
        b.push(d.call(e, g.value));
      }
    } else {
      g = a.length;
      for (var h = 0; h < g; h++) {
        b.push(d.call(e, a[h]));
      }
    }
    return b;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(a, d) {
    return a === d ? 0 !== a || 1 / a === 1 / d : a !== a && d !== d;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, d) {
      return d;
    });
  };
}, "es8", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(d, e, c) {
      return d == a && "q" == e && c == b;
    }}));
    return !0 === b.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), d = Object.seal({}), c = new a([[b, 2], [d, 3]]);
      if (2 != c.get(b) || 3 != c.get(d)) {
        return !1;
      }
      c.delete(b);
      c.set(d, 4);
      return !c.has(b) && 4 == c.get(d);
    } catch (l) {
      return !1;
    }
  }
  function d(a) {
    $jscomp.owns(a, c) || $jscomp.defineProperty(a, c, {value:{}});
  }
  function e(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      d(a);
      return b(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (b()) {
      return a;
    }
  }
  var c = "$jscomp_hidden_" + Math.random();
  e("freeze");
  e("preventExtensions");
  e("seal");
  var g = 0, h = function(a) {
    this.id_ = (g += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  h.prototype.set = function(a, b) {
    d(a);
    if (!$jscomp.owns(a, c)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[c][this.id_] = b;
    return this;
  };
  h.prototype.get = function(a) {
    return $jscomp.owns(a, c) ? a[c][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_);
  };
  h.prototype.delete = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_) ? delete a[c][this.id_] : !1;
  };
  return h;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), d = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != d.get(b) || 1 != d.size || d.get({x:4}) || d.set({x:4}, "t") != d || 2 != d.size) {
        return !1;
      }
      var c = d.entries(), e = c.next();
      if (e.done || e.value[0] != b || "s" != e.value[1]) {
        return !1;
      }
      e = c.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !c.next().done ? !1 : !0;
    } catch (p) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (b()) {
      return a;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = new WeakMap, e = function(a) {
    this.data_ = {};
    this.head_ = h();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  e.prototype.set = function(a, b) {
    var d = c(this, a);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    a = c(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!c(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = c(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  e.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  e.prototype.values = function() {
    return g(this, function(a) {
      return a.value;
    });
  };
  e.prototype.forEach = function(a, b) {
    for (var d = this.entries(), c; !(c = d.next()).done;) {
      c = c.value, a.call(b, c[1], c[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var c = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? d.has(b) ? c = d.get(b) : (c = "" + ++m, d.set(b, c)) : c = "p_" + b;
    var e = a.data_[c];
    if (e && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:c, list:e, index:a, entry:f};
        }
      }
    }
    return {id:c, list:e, index:-1, entry:void 0};
  }, g = function(a, b) {
    var d = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != a.head_;) {
          d = d.previous;
        }
        for (; d.next != d.head;) {
          return d = d.next, {done:!1, value:b(d)};
        }
        d = null;
      }
      return {done:!0, value:void 0};
    });
  }, h = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, m = 0;
  return e;
}, "es6", "es3");
$jscomp.polyfill("Math.log1p", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    if (0.25 > a && -0.25 < a) {
      for (var b = a, e = 1, c = a, g = 0, h = 1; g != c;) {
        b *= a, h *= -1, c = (g = c) + h * b / ++e;
      }
      return c;
    }
    return Math.log(1 + a);
  };
}, "es6", "es3");
$jscomp.polyfill("Number.MAX_SAFE_INTEGER", function() {
  return 9007199254740991;
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function(a) {
  return a ? a : function(a) {
    return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a;
  };
}, "es6", "es3");
$jscomp.polyfill("Number.isInteger", function(a) {
  return a ? a : function(a) {
    return Number.isFinite(a) ? a === Math.floor(a) : !1;
  };
}, "es6", "es3");
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var d = 1; d < arguments.length; d++) {
    var e = arguments[d];
    if (e) {
      for (var c in e) {
        $jscomp.owns(e, c) && (a[c] = e[c]);
      }
    }
  }
  return a;
};
$jscomp.polyfill("Object.getOwnPropertySymbols", function(a) {
  return a ? a : function() {
    return [];
  };
}, "es6", "es5");
$jscomp.polyfill("Reflect.ownKeys", function(a) {
  return a ? a : function(a) {
    var b = [], e = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var c = 0; c < e.length; c++) {
      ("jscomp_symbol_" == e[c].substring(0, 14) ? a : b).push(e[c]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (d) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
  a.__proto__ = b;
  if (a.__proto__ !== b) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.construct = function() {
  function a() {
    function a() {
    }
    new a;
    Reflect.construct(a, [], function() {
    });
    return new a instanceof a;
  }
  if ("undefined" != typeof Reflect && Reflect.construct) {
    if (a()) {
      return Reflect.construct;
    }
    var b = Reflect.construct;
    return function(a, e, c) {
      a = b(a, e);
      c && Reflect.setPrototypeOf(a, c.prototype);
      return a;
    };
  }
  return function(a, b, c) {
    void 0 === c && (c = a);
    c = $jscomp.objectCreate(c.prototype || Object.prototype);
    return Function.prototype.apply.call(a, c, b) || c;
  };
}();
$jscomp.polyfill("Reflect.getOwnPropertyDescriptor", function(a) {
  return a || Object.getOwnPropertyDescriptor;
}, "es6", "es5");
$jscomp.polyfill("Reflect.getPrototypeOf", function(a) {
  return a || Object.getPrototypeOf;
}, "es6", "es5");
$jscomp.findDescriptor = function(a, b) {
  for (; a;) {
    var d = Reflect.getOwnPropertyDescriptor(a, b);
    if (d) {
      return d;
    }
    a = Reflect.getPrototypeOf(a);
  }
};
$jscomp.polyfill("Reflect.isExtensible", function(a) {
  return a ? a : $jscomp.ASSUME_ES5 || "function" == typeof Object.isExtensible ? Object.isExtensible : function() {
    return !0;
  };
}, "es6", "es3");
$jscomp.checkStringArgs = function(a, b, d) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
  return a ? a : function(a) {
    var b = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > a || 1342177279 < a) {
      throw new RangeError("Invalid count value");
    }
    a |= 0;
    for (var e = ""; a;) {
      if (a & 1 && (e += b), a >>>= 1) {
        b += b;
      }
    }
    return e;
  };
}, "es6", "es3");
$jscomp.stringPadding = function(a, b) {
  a = void 0 !== a ? String(a) : " ";
  return 0 < b && a ? a.repeat(Math.ceil(b / a.length)).substring(0, b) : "";
};
$jscomp.arrayFromIterator = function(a) {
  for (var b, d = []; !(b = a.next()).done;) {
    d.push(b.value);
  }
  return d;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.inherits = function(a, b) {
  a.prototype = $jscomp.objectCreate(b.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var d = $jscomp.setPrototypeOf;
    d(a, b);
  } else {
    for (d in b) {
      if ("prototype" != d) {
        if (Object.defineProperties) {
          var e = Object.getOwnPropertyDescriptor(b, d);
          e && Object.defineProperty(a, d, e);
        } else {
          a[d] = b[d];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
};
module.exports = function(a) {
  var b = function() {
    return $jscomp.executeAsyncGenerator(function() {
      function a(a, c, d) {
        for (;;) {
          switch(b) {
            case 0:
              b = -1;
            default:
              return {value:void 0, done:!0};
          }
        }
      }
      var b = 0, c = {next:function(b) {
        return a(0.0, b, void 0);
      }, throw:function(b) {
        return a(1.0, void 0, b);
      }, return:function(a) {
        throw Error("Not yet implemented");
      }};
      $jscomp.initSymbolIterator();
      c[Symbol.iterator] = function() {
        return this;
      };
      return c;
    }());
  }.constructor("return 'foo';")();
  if (!(b instanceof Promise)) {
    return !1;
  }
  b.then(function(b) {
    "foo" === b && a();
  });
};

