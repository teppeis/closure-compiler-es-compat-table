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
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, g) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = g.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var g = a[b];
    if (g && g.Math == Math) {
      return g;
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
  var g = $jscomp.propertyToPolyfillSymbol[b];
  if (null == g) {
    return a[b];
  }
  g = a[g];
  return void 0 !== g ? g : a[b];
};
$jscomp.polyfill = function(a, b, g, f) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, g, f) : $jscomp.polyfillUnisolated(a, b, g, f));
};
$jscomp.polyfillUnisolated = function(a, b, g, f) {
  g = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var h = a[f];
    if (!(h in g)) {
      return;
    }
    g = g[h];
  }
  a = a[a.length - 1];
  f = g[a];
  b = b(f);
  b != f && null != b && $jscomp.defineProperty(g, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, g, f) {
  var h = a.split(".");
  a = 1 === h.length;
  f = h[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var n = 0; n < h.length - 1; n++) {
    var c = h[n];
    if (!(c in f)) {
      return;
    }
    f = f[c];
  }
  h = h[h.length - 1];
  g = $jscomp.IS_SYMBOL_NATIVE && "es6" === g ? f[h] : null;
  b = b(g);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, h, {configurable:!0, writable:!0, value:b}) : b !== g && (void 0 === $jscomp.propertyToPolyfillSymbol[h] && (g = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + g + "$" + h), $jscomp.defineProperty(f, $jscomp.propertyToPolyfillSymbol[h], {configurable:!0, writable:!0, value:b})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(n, c) {
    this.$jscomp$symbol$id_ = n;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:c});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var g = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", f = 0, h = function(n) {
    if (this instanceof h) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b(g + (n || "") + "_" + f++, n);
  };
  return h;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), g = 0; g < b.length; g++) {
    var f = $jscomp.global[b[g]];
    "function" === typeof f && "function" != typeof f.prototype[a] && $jscomp.defineProperty(f.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (g) {
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
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(a) {
  if (!(a instanceof Object)) {
    throw new TypeError("Iterator result " + a + " is not an object");
  }
};
$jscomp.generator.Context = function() {
  this.isRunning_ = !1;
  this.yieldAllIterator_ = null;
  this.yieldResult = void 0;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
$jscomp.generator.Context.prototype.start_ = function() {
  if (this.isRunning_) {
    throw new TypeError("Generator is already running");
  }
  this.isRunning_ = !0;
};
$jscomp.generator.Context.prototype.stop_ = function() {
  this.isRunning_ = !1;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function(a) {
  this.yieldResult = a;
};
$jscomp.generator.Context.prototype.throw_ = function(a) {
  this.abruptCompletion_ = {exception:a, isException:!0};
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype.return = function(a) {
  this.abruptCompletion_ = {return:a};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(a) {
  this.abruptCompletion_ = {jumpTo:a};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function(a, b) {
  this.nextAddress = b;
  return {value:a};
};
$jscomp.generator.Context.prototype.yieldAll = function(a, b) {
  a = $jscomp.makeIterator(a);
  var g = a.next();
  $jscomp.generator.ensureIteratorResultIsObject_(g);
  if (g.done) {
    this.yieldResult = g.value, this.nextAddress = b;
  } else {
    return this.yieldAllIterator_ = a, this.yield(g.value, b);
  }
};
$jscomp.generator.Context.prototype.jumpTo = function(a) {
  this.nextAddress = a;
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(a, b) {
  this.catchAddress_ = a;
  void 0 != b && (this.finallyAddress_ = b);
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(a) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = a || 0;
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(a, b) {
  this.nextAddress = a;
  this.catchAddress_ = b || 0;
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(a) {
  this.catchAddress_ = a || 0;
  a = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return a;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, g) {
  g ? this.finallyContexts_[g] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
  this.catchAddress_ = a || 0;
  this.finallyAddress_ = b || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(a, b) {
  b = this.finallyContexts_.splice(b || 0)[0];
  if (b = this.abruptCompletion_ = this.abruptCompletion_ || b) {
    if (b.isException) {
      return this.jumpToErrorHandler_();
    }
    void 0 != b.jumpTo && this.finallyAddress_ < b.jumpTo ? (this.nextAddress = b.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_;
  } else {
    this.nextAddress = a;
  }
};
$jscomp.generator.Context.prototype.forIn = function(a) {
  return new $jscomp.generator.Context.PropertyIterator(a);
};
$jscomp.generator.Context.PropertyIterator = function(a) {
  this.object_ = a;
  this.properties_ = [];
  for (var b in a) {
    this.properties_.push(b);
  }
  this.properties_.reverse();
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
  for (; 0 < this.properties_.length;) {
    var a = this.properties_.pop();
    if (a in this.object_) {
      return a;
    }
  }
  return null;
};
$jscomp.generator.Engine_ = function(a) {
  this.context_ = new $jscomp.generator.Context;
  this.program_ = a;
};
$jscomp.generator.Engine_.prototype.next_ = function(a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
  }
  this.context_.next_(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function(a) {
  this.context_.start_();
  var b = this.context_.yieldAllIterator_;
  if (b) {
    return this.yieldAllStep_("return" in b ? b["return"] : function(g) {
      return {value:g, done:!0};
    }, a, this.context_.return);
  }
  this.context_.return(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function(a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
  }
  this.context_.throw_(a);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, g) {
  try {
    var f = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(f);
    if (!f.done) {
      return this.context_.stop_(), f;
    }
    var h = f.value;
  } catch (n) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(n), this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  g.call(this.context_, h);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
  for (; this.context_.nextAddress;) {
    try {
      var a = this.program_(this.context_);
      if (a) {
        return this.context_.stop_(), {value:a.value, done:!1};
      }
    } catch (b) {
      this.context_.yieldResult = void 0, this.context_.throw_(b);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    a = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (a.isException) {
      throw a.exception;
    }
    return {value:a.return, done:!0};
  }
  return {value:void 0, done:!0};
};
$jscomp.generator.Generator_ = function(a) {
  this.next = function(b) {
    return a.next_(b);
  };
  this.throw = function(b) {
    return a.throw_(b);
  };
  this.return = function(b) {
    return a.return_(b);
  };
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(a, b) {
  b = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
  $jscomp.setPrototypeOf && a.prototype && $jscomp.setPrototypeOf(b, a.prototype);
  return b;
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(g, f, h) {
      return g == a && "q" == f && h == b;
    }}));
    return !0 === b.q;
  } catch (g) {
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
      var e = Object.seal({}), k = Object.seal({}), m = new a([[e, 2], [k, 3]]);
      if (2 != m.get(e) || 3 != m.get(k)) {
        return !1;
      }
      m.delete(e);
      m.set(k, 4);
      return !m.has(e) && 4 == m.get(k);
    } catch (p) {
      return !1;
    }
  }
  function g() {
  }
  function f(e) {
    var k = typeof e;
    return "object" === k && null !== e || "function" === k;
  }
  function h(e) {
    if (!$jscomp.owns(e, c)) {
      var k = new g;
      $jscomp.defineProperty(e, c, {value:k});
    }
  }
  function n(e) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var k = Object[e];
      k && (Object[e] = function(m) {
        if (m instanceof g) {
          return m;
        }
        Object.isExtensible(m) && h(m);
        return k(m);
      });
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
  var c = "$jscomp_hidden_" + Math.random();
  n("freeze");
  n("preventExtensions");
  n("seal");
  var l = 0, d = function(e) {
    this.id_ = (l += Math.random() + 1).toString();
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var k; !(k = e.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  };
  d.prototype.set = function(e, k) {
    if (!f(e)) {
      throw Error("Invalid WeakMap key");
    }
    h(e);
    if (!$jscomp.owns(e, c)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[c][this.id_] = k;
    return this;
  };
  d.prototype.get = function(e) {
    return f(e) && $jscomp.owns(e, c) ? e[c][this.id_] : void 0;
  };
  d.prototype.has = function(e) {
    return f(e) && $jscomp.owns(e, c) && $jscomp.owns(e[c], this.id_);
  };
  d.prototype.delete = function(e) {
    return f(e) && $jscomp.owns(e, c) && $jscomp.owns(e[c], this.id_) ? delete e[c][this.id_] : !1;
  };
  return d;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), e = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != e.get(d) || 1 != e.size || e.get({x:4}) || e.set({x:4}, "t") != e || 2 != e.size) {
        return !1;
      }
      var k = e.entries(), m = k.next();
      if (m.done || m.value[0] != d || "s" != m.value[1]) {
        return !1;
      }
      m = k.next();
      return m.done || 4 != m.value[0].x || "t" != m.value[1] || !k.next().done ? !1 : !0;
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
  var g = new WeakMap, f = function(d) {
    this.data_ = {};
    this.head_ = c();
    this.size = 0;
    if (d) {
      d = $jscomp.makeIterator(d);
      for (var e; !(e = d.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  f.prototype.set = function(d, e) {
    d = 0 === d ? 0 : d;
    var k = h(this, d);
    k.list || (k.list = this.data_[k.id] = []);
    k.entry ? k.entry.value = e : (k.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:d, value:e, }, k.list.push(k.entry), this.head_.previous.next = k.entry, this.head_.previous = k.entry, this.size++);
    return this;
  };
  f.prototype.delete = function(d) {
    d = h(this, d);
    return d.entry && d.list ? (d.list.splice(d.index, 1), d.list.length || delete this.data_[d.id], d.entry.previous.next = d.entry.next, d.entry.next.previous = d.entry.previous, d.entry.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = c();
    this.size = 0;
  };
  f.prototype.has = function(d) {
    return !!h(this, d).entry;
  };
  f.prototype.get = function(d) {
    return (d = h(this, d).entry) && d.value;
  };
  f.prototype.entries = function() {
    return n(this, function(d) {
      return [d.key, d.value];
    });
  };
  f.prototype.keys = function() {
    return n(this, function(d) {
      return d.key;
    });
  };
  f.prototype.values = function() {
    return n(this, function(d) {
      return d.value;
    });
  };
  f.prototype.forEach = function(d, e) {
    for (var k = this.entries(), m; !(m = k.next()).done;) {
      m = m.value, d.call(e, m[1], m[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var h = function(d, e) {
    var k = e && typeof e;
    "object" == k || "function" == k ? g.has(e) ? k = g.get(e) : (k = "" + ++l, g.set(e, k)) : k = "p_" + e;
    var m = d.data_[k];
    if (m && $jscomp.owns(d.data_, k)) {
      for (d = 0; d < m.length; d++) {
        var p = m[d];
        if (e !== e && p.key !== p.key || e === p.key) {
          return {id:k, list:m, index:d, entry:p};
        }
      }
    }
    return {id:k, list:m, index:-1, entry:void 0};
  }, n = function(d, e) {
    var k = d.head_;
    return $jscomp.iteratorPrototype(function() {
      if (k) {
        for (; k.head != d.head_;) {
          k = k.previous;
        }
        for (; k.next != k.head;) {
          return k = k.next, {done:!1, value:e(k)};
        }
        k = null;
      }
      return {done:!0, value:void 0};
    });
  }, c = function() {
    var d = {};
    return d.previous = d.next = d.head = d;
  }, l = 0;
  return f;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({x:4}), h = new a($jscomp.makeIterator([f]));
      if (!h.has(f) || 1 != h.size || h.add(f) != h || 1 != h.size || h.add({x:4}) != h || 2 != h.size) {
        return !1;
      }
      var n = h.entries(), c = n.next();
      if (c.done || c.value[0] != f || c.value[1] != f) {
        return !1;
      }
      c = n.next();
      return c.done || c.value[0] == f || 4 != c.value[0].x || c.value[1] != c.value[0] ? !1 : n.next().done;
    } catch (l) {
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
  var g = function(f) {
    this.map_ = new Map;
    if (f) {
      f = $jscomp.makeIterator(f);
      for (var h; !(h = f.next()).done;) {
        this.add(h.value);
      }
    }
    this.size = this.map_.size;
  };
  g.prototype.add = function(f) {
    f = 0 === f ? 0 : f;
    this.map_.set(f, f);
    this.size = this.map_.size;
    return this;
  };
  g.prototype.delete = function(f) {
    f = this.map_.delete(f);
    this.size = this.map_.size;
    return f;
  };
  g.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  g.prototype.has = function(f) {
    return this.map_.has(f);
  };
  g.prototype.entries = function() {
    return this.map_.entries();
  };
  g.prototype.values = function() {
    return this.map_.values();
  };
  g.prototype.keys = g.prototype.values;
  g.prototype[Symbol.iterator] = g.prototype.values;
  g.prototype.forEach = function(f, h) {
    var n = this;
    this.map_.forEach(function(c) {
      return f.call(h, c, c, n);
    });
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function g(c) {
    return c instanceof h ? c : new h(function(l, d) {
      l(c);
    });
  }
  if (a && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof $jscomp.global.PromiseRejectionEvent) || !$jscomp.global.Promise || -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))) {
    return a;
  }
  b.prototype.asyncExecute = function(c) {
    if (null == this.batch_) {
      this.batch_ = [];
      var l = this;
      this.asyncExecuteFunction(function() {
        l.executeBatch_();
      });
    }
    this.batch_.push(c);
  };
  var f = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(c) {
    f(c, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var c = this.batch_;
      this.batch_ = [];
      for (var l = 0; l < c.length; ++l) {
        var d = c[l];
        c[l] = null;
        try {
          d();
        } catch (e) {
          this.asyncThrow_(e);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(c) {
    this.asyncExecuteFunction(function() {
      throw c;
    });
  };
  var h = function(c) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var l = this.createResolveAndReject_();
    try {
      c(l.resolve, l.reject);
    } catch (d) {
      l.reject(d);
    }
  };
  h.prototype.createResolveAndReject_ = function() {
    function c(e) {
      return function(k) {
        d || (d = !0, e.call(l, k));
      };
    }
    var l = this, d = !1;
    return {resolve:c(this.resolveTo_), reject:c(this.reject_)};
  };
  h.prototype.resolveTo_ = function(c) {
    if (c === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (c instanceof h) {
        this.settleSameAsPromise_(c);
      } else {
        a: {
          switch(typeof c) {
            case "object":
              var l = null != c;
              break a;
            case "function":
              l = !0;
              break a;
            default:
              l = !1;
          }
        }
        l ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c);
      }
    }
  };
  h.prototype.resolveToNonPromiseObj_ = function(c) {
    var l = void 0;
    try {
      l = c.then;
    } catch (d) {
      this.reject_(d);
      return;
    }
    "function" == typeof l ? this.settleSameAsThenable_(l, c) : this.fulfill_(c);
  };
  h.prototype.reject_ = function(c) {
    this.settle_(2, c);
  };
  h.prototype.fulfill_ = function(c) {
    this.settle_(1, c);
  };
  h.prototype.settle_ = function(c, l) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + c + ", " + l + "): Promise already settled in state" + this.state_);
    }
    this.state_ = c;
    this.result_ = l;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  h.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var c = this;
    f(function() {
      if (c.notifyUnhandledRejection_()) {
        var l = $jscomp.global.console;
        "undefined" !== typeof l && l.error(c.result_);
      }
    }, 1);
  };
  h.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var c = $jscomp.global.CustomEvent, l = $jscomp.global.Event, d = $jscomp.global.dispatchEvent;
    if ("undefined" === typeof d) {
      return !0;
    }
    "function" === typeof c ? c = new c("unhandledrejection", {cancelable:!0}) : "function" === typeof l ? c = new l("unhandledrejection", {cancelable:!0}) : (c = $jscomp.global.document.createEvent("CustomEvent"), c.initCustomEvent("unhandledrejection", !1, !0, c));
    c.promise = this;
    c.reason = this.result_;
    return d(c);
  };
  h.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var c = 0; c < this.onSettledCallbacks_.length; ++c) {
        n.asyncExecute(this.onSettledCallbacks_[c]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var n = new b;
  h.prototype.settleSameAsPromise_ = function(c) {
    var l = this.createResolveAndReject_();
    c.callWhenSettled_(l.resolve, l.reject);
  };
  h.prototype.settleSameAsThenable_ = function(c, l) {
    var d = this.createResolveAndReject_();
    try {
      c.call(l, d.resolve, d.reject);
    } catch (e) {
      d.reject(e);
    }
  };
  h.prototype.then = function(c, l) {
    function d(p, q) {
      return "function" == typeof p ? function(r) {
        try {
          e(p(r));
        } catch (t) {
          k(t);
        }
      } : q;
    }
    var e, k, m = new h(function(p, q) {
      e = p;
      k = q;
    });
    this.callWhenSettled_(d(c, e), d(l, k));
    return m;
  };
  h.prototype.catch = function(c) {
    return this.then(void 0, c);
  };
  h.prototype.callWhenSettled_ = function(c, l) {
    function d() {
      switch(e.state_) {
        case 1:
          c(e.result_);
          break;
        case 2:
          l(e.result_);
          break;
        default:
          throw Error("Unexpected state: " + e.state_);
      }
    }
    var e = this;
    null == this.onSettledCallbacks_ ? n.asyncExecute(d) : this.onSettledCallbacks_.push(d);
    this.isRejectionHandled_ = !0;
  };
  h.resolve = g;
  h.reject = function(c) {
    return new h(function(l, d) {
      d(c);
    });
  };
  h.race = function(c) {
    return new h(function(l, d) {
      for (var e = $jscomp.makeIterator(c), k = e.next(); !k.done; k = e.next()) {
        g(k.value).callWhenSettled_(l, d);
      }
    });
  };
  h.all = function(c) {
    var l = $jscomp.makeIterator(c), d = l.next();
    return d.done ? g([]) : new h(function(e, k) {
      function m(r) {
        return function(t) {
          p[r] = t;
          q--;
          0 == q && e(p);
        };
      }
      var p = [], q = 0;
      do {
        p.push(void 0), q++, g(d.value).callWhenSettled_(m(p.length - 1), k), d = l.next();
      } while (!d.done);
    });
  };
  return h;
}, "es6", "es3");
module.exports = function() {
  var a = !0, b = Symbol.toStringTag;
  [[String, "String Iterator"], [Array, "Array Iterator"], [Map, "Map Iterator"], [Set, "Set Iterator"]].forEach(function(g) {
    var f = Object.getPrototypeOf((new g[0])[Symbol.iterator]());
    a = a && f.hasOwnProperty(b) && f[b] === g[1];
  });
  return a = a && "GeneratorFunction" === Object.getPrototypeOf(function f() {
    return $jscomp.generator.createGenerator(f, function(h) {
      h.jumpToEnd();
    });
  })[b] && "Generator" === Object.getPrototypeOf(function h() {
    return $jscomp.generator.createGenerator(h, function(n) {
      n.jumpToEnd();
    });
  }())[b] && "Map" === Map.prototype[b] && "Set" === Set.prototype[b] && "ArrayBuffer" === ArrayBuffer.prototype[b] && "DataView" === DataView.prototype[b] && "Promise" === Promise.prototype[b] && "Symbol" === Symbol.prototype[b] && "function" === typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get;
};

