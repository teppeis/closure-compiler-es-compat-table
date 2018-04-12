var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("Array.prototype.fill", function(a) {
  return a ? a : function(a, c, d) {
    var b = this.length || 0;
    0 > c && (c = Math.max(0, b + c));
    if (null == d || d > b) {
      d = b;
    }
    d = Number(d);
    0 > d && (d = Math.max(0, b + d));
    for (c = Number(c || 0); c < d; c++) {
      this[c] = a;
    }
    return this;
  };
}, "es6", "es3");
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
$jscomp.iteratorFromArray = function(a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0, d = {next:function() {
    if (c < a.length) {
      var e = c++;
      return {value:b(e, a[e]), done:!1};
    }
    d.next = function() {
      return {done:!0, value:void 0};
    };
    return d.next();
  }};
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
};
$jscomp.polyfill("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, c) {
      return [a, c];
    });
  };
}, "es6", "es3");
$jscomp.findInternal = function(a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e];
    if (b.call(c, f, e, a)) {
      return {i:e, v:f};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, c, d) {
    $jscomp.initSymbolIterator();
    c = null != c ? c : function(a) {
      return a;
    };
    var b = [], f = a[Symbol.iterator];
    if ("function" == typeof f) {
      for (a = f.call(a); !(f = a.next()).done;) {
        b.push(c.call(d, f.value));
      }
    } else {
      f = a.length;
      for (var g = 0; g < f; g++) {
        b.push(c.call(d, a[g]));
      }
    }
    return b;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
  return a ? a : function(a, c) {
    return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, c) {
      return c;
    });
  };
}, "es8", "es3");
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function c(a) {
    return a instanceof e ? a : new e(function(b, c) {
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
  var d = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(a) {
    d(a, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        delete a[b];
        try {
          c();
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
  var e = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject);
    } catch (h) {
      b.reject(h);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(h) {
        c || (c = !0, a.call(b, h));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  e.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof e) {
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
  e.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  e.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  e.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  e.prototype.settle_ = function(a, b) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + b | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_();
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, b = 0; b < a.length; ++b) {
        a[b].call(), a[b] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var f = new b;
  e.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  e.prototype.settleSameAsThenable_ = function(a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (k) {
      c.reject(k);
    }
  };
  e.prototype.then = function(a, b) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          d(a(b));
        } catch (n) {
          l(n);
        }
      } : b;
    }
    var d, l, m = new e(function(a, b) {
      d = a;
      l = b;
    });
    this.callWhenSettled_(c(a, d), c(b, l));
    return m;
  };
  e.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  e.prototype.callWhenSettled_ = function(a, b) {
    function c() {
      switch(d.state_) {
        case 1:
          a(d.result_);
          break;
        case 2:
          b(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }
    var d = this;
    null == this.onSettledCallbacks_ ? f.asyncExecute(c) : this.onSettledCallbacks_.push(function() {
      f.asyncExecute(c);
    });
  };
  e.resolve = c;
  e.reject = function(a) {
    return new e(function(b, c) {
      c(a);
    });
  };
  e.race = function(a) {
    return new e(function(b, d) {
      for (var h = $jscomp.makeIterator(a), e = h.next(); !e.done; e = h.next()) {
        c(e.value).callWhenSettled_(b, d);
      }
    });
  };
  e.all = function(a) {
    var b = $jscomp.makeIterator(a), d = b.next();
    return d.done ? c([]) : new e(function(a, e) {
      function h(b) {
        return function(c) {
          k[b] = c;
          l--;
          0 == l && a(k);
        };
      }
      var k = [], l = 0;
      do {
        k.push(void 0), l++, c(d.value).callWhenSettled_(h(k.length - 1), e), d = b.next();
      } while (!d.done);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.executeAsyncGenerator = function(a) {
  function b(b) {
    return a.next(b);
  }
  function c(b) {
    return a.throw(b);
  }
  return new Promise(function(d, e) {
    function f(a) {
      a.done ? d(a.value) : Promise.resolve(a.value).then(b, c).then(f, e);
    }
    f(a.next());
  });
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(c, d, e) {
      return c == a && "q" == d && e == b;
    }}));
    return !0 === b.q;
  } catch (c) {
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
      var b = Object.seal({}), c = Object.seal({}), d = new a([[b, 2], [c, 3]]);
      if (2 != d.get(b) || 3 != d.get(c)) {
        return !1;
      }
      d.delete(b);
      d.set(c, 4);
      return !d.has(b) && 4 == d.get(c);
    } catch (l) {
      return !1;
    }
  }
  function c(a) {
    $jscomp.owns(a, e) || $jscomp.defineProperty(a, e, {value:{}});
  }
  function d(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      c(a);
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
  var e = "$jscomp_hidden_" + Math.random();
  d("freeze");
  d("preventExtensions");
  d("seal");
  var f = 0, g = function(a) {
    this.id_ = (f += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  g.prototype.set = function(a, b) {
    c(a);
    if (!$jscomp.owns(a, e)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[e][this.id_] = b;
    return this;
  };
  g.prototype.get = function(a) {
    return $jscomp.owns(a, e) ? a[e][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_);
  };
  g.prototype.delete = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1;
  };
  return g;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != c.get(b) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var d = c.entries(), e = d.next();
      if (e.done || e.value[0] != b || "s" != e.value[1]) {
        return !1;
      }
      e = d.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0;
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
  var c = new WeakMap, d = function(a) {
    this.data_ = {};
    this.head_ = g();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  d.prototype.set = function(a, b) {
    var c = e(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(a) {
    a = e(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  d.prototype.has = function(a) {
    return !!e(this, a).entry;
  };
  d.prototype.get = function(a) {
    return (a = e(this, a).entry) && a.value;
  };
  d.prototype.entries = function() {
    return f(this, function(a) {
      return [a.key, a.value];
    });
  };
  d.prototype.keys = function() {
    return f(this, function(a) {
      return a.key;
    });
  };
  d.prototype.values = function() {
    return f(this, function(a) {
      return a.value;
    });
  };
  d.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var e = function(a, b) {
    var d = b && typeof b;
    "object" == d || "function" == d ? c.has(b) ? d = c.get(b) : (d = "" + ++m, c.set(b, d)) : d = "p_" + b;
    var e = a.data_[d];
    if (e && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:d, list:e, index:a, entry:f};
        }
      }
    }
    return {id:d, list:e, index:-1, entry:void 0};
  }, f = function(a, b) {
    var c = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (c) {
        for (; c.head != a.head_;) {
          c = c.previous;
        }
        for (; c.next != c.head;) {
          return c = c.next, {done:!1, value:b(c)};
        }
        c = null;
      }
      return {done:!0, value:void 0};
    });
  }, g = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, m = 0;
  return d;
}, "es6", "es3");
$jscomp.polyfill("Math.log1p", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    if (0.25 > a && -0.25 < a) {
      for (var b = a, d = 1, e = a, f = 0, g = 1; f != e;) {
        b *= a, g *= -1, e = (f = e) + g * b / ++d;
      }
      return e;
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
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) {
      for (var e in d) {
        $jscomp.owns(d, e) && (a[e] = d[e]);
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
    var b = [], d = Object.getOwnPropertyNames(a);
    a = Object.getOwnPropertySymbols(a);
    for (var e = 0; e < d.length; e++) {
      ("jscomp_symbol_" == d[e].substring(0, 14) ? a : b).push(d[e]);
    }
    return b.concat(a);
  };
}, "es6", "es5");
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (c) {
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
    return function(a, d, e) {
      a = b(a, d);
      e && Reflect.setPrototypeOf(a, e.prototype);
      return a;
    };
  }
  return function(a, b, e) {
    void 0 === e && (e = a);
    e = $jscomp.objectCreate(e.prototype || Object.prototype);
    return Function.prototype.apply.call(a, e, b) || e;
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
    var c = Reflect.getOwnPropertyDescriptor(a, b);
    if (c) {
      return c;
    }
    a = Reflect.getPrototypeOf(a);
  }
};
$jscomp.polyfill("Reflect.isExtensible", function(a) {
  return a ? a : $jscomp.ASSUME_ES5 || "function" == typeof Object.isExtensible ? Object.isExtensible : function() {
    return !0;
  };
}, "es6", "es3");
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
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
    for (var d = ""; a;) {
      if (a & 1 && (d += b), a >>>= 1) {
        b += b;
      }
    }
    return d;
  };
}, "es6", "es3");
$jscomp.stringPadding = function(a, b) {
  a = void 0 !== a ? String(a) : " ";
  return 0 < b && a ? a.repeat(Math.ceil(b / a.length)).substring(0, b) : "";
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
          var d = Object.getOwnPropertyDescriptor(b, c);
          d && Object.defineProperty(a, c, d);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
};
module.exports = function() {
  var a = [];
  (new Proxy([1, 2, 3, 4, 5, 6], {set:function(b, c, d) {
    a.push(c);
    b[c] = d;
    return !0;
  }})).fill(0, 3);
  return "3,4,5" === a + "";
};

