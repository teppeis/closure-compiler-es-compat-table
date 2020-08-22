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
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, h) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = h.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var h = a[b];
    if (h && h.Math == Math) {
      return h;
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
  var h = $jscomp.propertyToPolyfillSymbol[b];
  if (null == h) {
    return a[b];
  }
  h = a[h];
  return void 0 !== h ? h : a[b];
};
$jscomp.polyfill = function(a, b, h, f) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, h, f) : $jscomp.polyfillUnisolated(a, b, h, f));
};
$jscomp.polyfillUnisolated = function(a, b, h, f) {
  h = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var g = a[f];
    if (!(g in h)) {
      return;
    }
    h = h[g];
  }
  a = a[a.length - 1];
  f = h[a];
  b = b(f);
  b != f && null != b && $jscomp.defineProperty(h, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, h, f) {
  var g = a.split(".");
  a = 1 === g.length;
  f = g[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var n = 0; n < g.length - 1; n++) {
    var d = g[n];
    if (!(d in f)) {
      return;
    }
    f = f[d];
  }
  g = g[g.length - 1];
  h = $jscomp.IS_SYMBOL_NATIVE && "es6" === h ? f[g] : null;
  b = b(h);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, g, {configurable:!0, writable:!0, value:b}) : b !== h && ($jscomp.propertyToPolyfillSymbol[g] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(g) : $jscomp.POLYFILL_PREFIX + g, g = $jscomp.propertyToPolyfillSymbol[g], $jscomp.defineProperty(f, g, {configurable:!0, writable:!0, value:b})));
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(a) {
  if (a) {
    return a;
  }
  var b = function(g, n) {
    this.$jscomp$symbol$id_ = g;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:n});
  };
  b.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var h = 0, f = function(g) {
    if (this instanceof f) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new b("jscomp_symbol_" + (g || "") + "_" + h++, g);
  };
  return f;
}, "es6", "es3");
$jscomp.initSymbolIterator = function() {
};
$jscomp.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), h = 0; h < b.length; h++) {
    var f = $jscomp.global[b[h]];
    "function" === typeof f && "function" != typeof f.prototype[a] && $jscomp.defineProperty(f.prototype, a, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
$jscomp.initSymbolAsyncIterator = function() {
};
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
  } catch (h) {
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
  var h = a.next();
  $jscomp.generator.ensureIteratorResultIsObject_(h);
  if (h.done) {
    this.yieldResult = h.value, this.nextAddress = b;
  } else {
    return this.yieldAllIterator_ = a, this.yield(h.value, b);
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
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, h) {
  h ? this.finallyContexts_[h] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
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
    return this.yieldAllStep_("return" in b ? b["return"] : function(h) {
      return {value:h, done:!0};
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
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, h) {
  try {
    var f = a.call(this.context_.yieldAllIterator_, b);
    $jscomp.generator.ensureIteratorResultIsObject_(f);
    if (!f.done) {
      return this.context_.stop_(), f;
    }
    var g = f.value;
  } catch (n) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(n), this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  h.call(this.context_, g);
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
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(h, f, g) {
      return h == a && "q" == f && g == b;
    }}));
    return !0 === b.q;
  } catch (h) {
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
  function h() {
  }
  function f(e) {
    var k = typeof e;
    return "object" === k && null !== e || "function" === k;
  }
  function g(e) {
    if (!$jscomp.owns(e, d)) {
      var k = new h;
      $jscomp.defineProperty(e, d, {value:k});
    }
  }
  function n(e) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var k = Object[e];
      k && (Object[e] = function(m) {
        if (m instanceof h) {
          return m;
        }
        Object.isExtensible(m) && g(m);
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
  var d = "$jscomp_hidden_" + Math.random();
  n("freeze");
  n("preventExtensions");
  n("seal");
  var l = 0, c = function(e) {
    this.id_ = (l += Math.random() + 1).toString();
    if (e) {
      e = $jscomp.makeIterator(e);
      for (var k; !(k = e.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  };
  c.prototype.set = function(e, k) {
    if (!f(e)) {
      throw Error("Invalid WeakMap key");
    }
    g(e);
    if (!$jscomp.owns(e, d)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[d][this.id_] = k;
    return this;
  };
  c.prototype.get = function(e) {
    return f(e) && $jscomp.owns(e, d) ? e[d][this.id_] : void 0;
  };
  c.prototype.has = function(e) {
    return f(e) && $jscomp.owns(e, d) && $jscomp.owns(e[d], this.id_);
  };
  c.prototype.delete = function(e) {
    return f(e) && $jscomp.owns(e, d) && $jscomp.owns(e[d], this.id_) ? delete e[d][this.id_] : !1;
  };
  return c;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), e = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != e.get(c) || 1 != e.size || e.get({x:4}) || e.set({x:4}, "t") != e || 2 != e.size) {
        return !1;
      }
      var k = e.entries(), m = k.next();
      if (m.done || m.value[0] != c || "s" != m.value[1]) {
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
  var h = new WeakMap, f = function(c) {
    this.data_ = {};
    this.head_ = d();
    this.size = 0;
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var e; !(e = c.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  f.prototype.set = function(c, e) {
    c = 0 === c ? 0 : c;
    var k = g(this, c);
    k.list || (k.list = this.data_[k.id] = []);
    k.entry ? k.entry.value = e : (k.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:c, value:e, }, k.list.push(k.entry), this.head_.previous.next = k.entry, this.head_.previous = k.entry, this.size++);
    return this;
  };
  f.prototype.delete = function(c) {
    c = g(this, c);
    return c.entry && c.list ? (c.list.splice(c.index, 1), c.list.length || delete this.data_[c.id], c.entry.previous.next = c.entry.next, c.entry.next.previous = c.entry.previous, c.entry.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = d();
    this.size = 0;
  };
  f.prototype.has = function(c) {
    return !!g(this, c).entry;
  };
  f.prototype.get = function(c) {
    return (c = g(this, c).entry) && c.value;
  };
  f.prototype.entries = function() {
    return n(this, function(c) {
      return [c.key, c.value];
    });
  };
  f.prototype.keys = function() {
    return n(this, function(c) {
      return c.key;
    });
  };
  f.prototype.values = function() {
    return n(this, function(c) {
      return c.value;
    });
  };
  f.prototype.forEach = function(c, e) {
    for (var k = this.entries(), m; !(m = k.next()).done;) {
      m = m.value, c.call(e, m[1], m[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var g = function(c, e) {
    var k = e && typeof e;
    "object" == k || "function" == k ? h.has(e) ? k = h.get(e) : (k = "" + ++l, h.set(e, k)) : k = "p_" + e;
    var m = c.data_[k];
    if (m && $jscomp.owns(c.data_, k)) {
      for (c = 0; c < m.length; c++) {
        var p = m[c];
        if (e !== e && p.key !== p.key || e === p.key) {
          return {id:k, list:m, index:c, entry:p};
        }
      }
    }
    return {id:k, list:m, index:-1, entry:void 0};
  }, n = function(c, e) {
    var k = c.head_;
    return $jscomp.iteratorPrototype(function() {
      if (k) {
        for (; k.head != c.head_;) {
          k = k.previous;
        }
        for (; k.next != k.head;) {
          return k = k.next, {done:!1, value:e(k)};
        }
        k = null;
      }
      return {done:!0, value:void 0};
    });
  }, d = function() {
    var c = {};
    return c.previous = c.next = c.head = c;
  }, l = 0;
  return f;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  function b() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({x:4}), g = new a($jscomp.makeIterator([f]));
      if (!g.has(f) || 1 != g.size || g.add(f) != g || 1 != g.size || g.add({x:4}) != g || 2 != g.size) {
        return !1;
      }
      var n = g.entries(), d = n.next();
      if (d.done || d.value[0] != f || d.value[1] != f) {
        return !1;
      }
      d = n.next();
      return d.done || d.value[0] == f || 4 != d.value[0].x || d.value[1] != d.value[0] ? !1 : n.next().done;
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
  var h = function(f) {
    this.map_ = new Map;
    if (f) {
      f = $jscomp.makeIterator(f);
      for (var g; !(g = f.next()).done;) {
        this.add(g.value);
      }
    }
    this.size = this.map_.size;
  };
  h.prototype.add = function(f) {
    f = 0 === f ? 0 : f;
    this.map_.set(f, f);
    this.size = this.map_.size;
    return this;
  };
  h.prototype.delete = function(f) {
    f = this.map_.delete(f);
    this.size = this.map_.size;
    return f;
  };
  h.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  h.prototype.has = function(f) {
    return this.map_.has(f);
  };
  h.prototype.entries = function() {
    return this.map_.entries();
  };
  h.prototype.values = function() {
    return this.map_.values();
  };
  h.prototype.keys = h.prototype.values;
  h.prototype[Symbol.iterator] = h.prototype.values;
  h.prototype.forEach = function(f, g) {
    var n = this;
    this.map_.forEach(function(d) {
      return f.call(g, d, d, n);
    });
  };
  return h;
}, "es6", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function b() {
    this.batch_ = null;
  }
  function h(d) {
    return d instanceof g ? d : new g(function(l, c) {
      l(d);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  b.prototype.asyncExecute = function(d) {
    if (null == this.batch_) {
      this.batch_ = [];
      var l = this;
      this.asyncExecuteFunction(function() {
        l.executeBatch_();
      });
    }
    this.batch_.push(d);
  };
  var f = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function(d) {
    f(d, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var d = this.batch_;
      this.batch_ = [];
      for (var l = 0; l < d.length; ++l) {
        var c = d[l];
        d[l] = null;
        try {
          c();
        } catch (e) {
          this.asyncThrow_(e);
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
  var g = function(d) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var l = this.createResolveAndReject_();
    try {
      d(l.resolve, l.reject);
    } catch (c) {
      l.reject(c);
    }
  };
  g.prototype.createResolveAndReject_ = function() {
    function d(e) {
      return function(k) {
        c || (c = !0, e.call(l, k));
      };
    }
    var l = this, c = !1;
    return {resolve:d(this.resolveTo_), reject:d(this.reject_)};
  };
  g.prototype.resolveTo_ = function(d) {
    if (d === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (d instanceof g) {
        this.settleSameAsPromise_(d);
      } else {
        a: {
          switch(typeof d) {
            case "object":
              var l = null != d;
              break a;
            case "function":
              l = !0;
              break a;
            default:
              l = !1;
          }
        }
        l ? this.resolveToNonPromiseObj_(d) : this.fulfill_(d);
      }
    }
  };
  g.prototype.resolveToNonPromiseObj_ = function(d) {
    var l = void 0;
    try {
      l = d.then;
    } catch (c) {
      this.reject_(c);
      return;
    }
    "function" == typeof l ? this.settleSameAsThenable_(l, d) : this.fulfill_(d);
  };
  g.prototype.reject_ = function(d) {
    this.settle_(2, d);
  };
  g.prototype.fulfill_ = function(d) {
    this.settle_(1, d);
  };
  g.prototype.settle_ = function(d, l) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + d + ", " + l + "): Promise already settled in state" + this.state_);
    }
    this.state_ = d;
    this.result_ = l;
    this.executeOnSettledCallbacks_();
  };
  g.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var d = 0; d < this.onSettledCallbacks_.length; ++d) {
        n.asyncExecute(this.onSettledCallbacks_[d]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var n = new b;
  g.prototype.settleSameAsPromise_ = function(d) {
    var l = this.createResolveAndReject_();
    d.callWhenSettled_(l.resolve, l.reject);
  };
  g.prototype.settleSameAsThenable_ = function(d, l) {
    var c = this.createResolveAndReject_();
    try {
      d.call(l, c.resolve, c.reject);
    } catch (e) {
      c.reject(e);
    }
  };
  g.prototype.then = function(d, l) {
    function c(p, q) {
      return "function" == typeof p ? function(r) {
        try {
          e(p(r));
        } catch (t) {
          k(t);
        }
      } : q;
    }
    var e, k, m = new g(function(p, q) {
      e = p;
      k = q;
    });
    this.callWhenSettled_(c(d, e), c(l, k));
    return m;
  };
  g.prototype.catch = function(d) {
    return this.then(void 0, d);
  };
  g.prototype.callWhenSettled_ = function(d, l) {
    function c() {
      switch(e.state_) {
        case 1:
          d(e.result_);
          break;
        case 2:
          l(e.result_);
          break;
        default:
          throw Error("Unexpected state: " + e.state_);
      }
    }
    var e = this;
    null == this.onSettledCallbacks_ ? n.asyncExecute(c) : this.onSettledCallbacks_.push(c);
  };
  g.resolve = h;
  g.reject = function(d) {
    return new g(function(l, c) {
      c(d);
    });
  };
  g.race = function(d) {
    return new g(function(l, c) {
      for (var e = $jscomp.makeIterator(d), k = e.next(); !k.done; k = e.next()) {
        h(k.value).callWhenSettled_(l, c);
      }
    });
  };
  g.all = function(d) {
    var l = $jscomp.makeIterator(d), c = l.next();
    return c.done ? h([]) : new g(function(e, k) {
      function m(r) {
        return function(t) {
          p[r] = t;
          q--;
          0 == q && e(p);
        };
      }
      var p = [], q = 0;
      do {
        p.push(void 0), q++, h(c.value).callWhenSettled_(m(p.length - 1), k), c = l.next();
      } while (!c.done);
    });
  };
  return g;
}, "es6", "es3");
module.exports = function() {
  var a = !0, b = Symbol.toStringTag;
  [[String, "String Iterator"], [Array, "Array Iterator"], [Map, "Map Iterator"], [Set, "Set Iterator"]].forEach(function(h) {
    var f = Object.getPrototypeOf((new h[0])[Symbol.iterator]());
    a = a && f.hasOwnProperty(b) && f[b] === h[1];
  });
  return a = a && "GeneratorFunction" === Object.getPrototypeOf(function f() {
    return $jscomp.generator.createGenerator(f, function(g) {
      g.jumpToEnd();
    });
  })[b] && "Generator" === Object.getPrototypeOf(function g() {
    return $jscomp.generator.createGenerator(g, function(n) {
      n.jumpToEnd();
    });
  }())[b] && "Map" === Map.prototype[b] && "Set" === Set.prototype[b] && "ArrayBuffer" === ArrayBuffer.prototype[b] && "DataView" === DataView.prototype[b] && "Promise" === Promise.prototype[b] && "Symbol" === Symbol.prototype[b] && "function" === typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get;
};

