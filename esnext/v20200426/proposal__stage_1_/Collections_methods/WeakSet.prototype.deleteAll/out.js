var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var d = 0; d < a.length; ++d) {
    var c = a[d];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, d = Object.create(new $jscomp.global.Proxy(a, {get:function(c, b, e) {
      return c == a && "q" == b && e == d;
    }}));
    return !0 === d.q;
  } catch (c) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var d = 0;
  return function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, c) {
  a != Array.prototype && a != Object.prototype && (a[d] = c.value);
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, d) {
  var c = $jscomp.propertyToPolyfillSymbol[d];
  if (null == c) {
    return a[d];
  }
  c = a[c];
  return void 0 !== c ? c : a[d];
};
$jscomp.polyfill = function(a, d, c, b) {
  d && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, d, c, b) : $jscomp.polyfillUnisolated(a, d, c, b));
};
$jscomp.polyfillUnisolated = function(a, d, c, b) {
  c = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var e = a[b];
    e in c || (c[e] = {});
    c = c[e];
  }
  a = a[a.length - 1];
  b = c[a];
  d = d(b);
  d != b && null != d && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:d});
};
$jscomp.polyfillIsolated = function(a, d, c, b) {
  var e = a.split(".");
  a = 1 === e.length;
  b = e[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var g = 0; g < e.length - 1; g++) {
    var f = e[g];
    f in b || (b[f] = {});
    b = b[f];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? b[e] : null;
  d = d(c);
  null != d && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:d}) : d !== c && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(b, e, {configurable:!0, writable:!0, value:d})));
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill("WeakMap", function(a) {
  function d() {
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
  function c() {
  }
  function b(a) {
    var b = typeof a;
    return "object" === b && null !== a || "function" === b;
  }
  function e(a) {
    if (!$jscomp.owns(a, f)) {
      var b = new c;
      $jscomp.defineProperty(a, f, {value:b});
    }
  }
  function g(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof c) {
        return a;
      }
      e(a);
      return b(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (d()) {
      return a;
    }
  }
  var f = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var k = 0, h = function(a) {
    this.id_ = (k += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  h.prototype.set = function(a, d) {
    if (!b(a)) {
      throw Error("Invalid WeakMap key");
    }
    e(a);
    if (!$jscomp.owns(a, f)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[f][this.id_] = d;
    return this;
  };
  h.prototype.get = function(a) {
    return b(a) && $jscomp.owns(a, f) ? a[f][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return b(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_);
  };
  h.prototype.delete = function(a) {
    return b(a) && $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_) ? delete a[f][this.id_] : !1;
  };
  return h;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function d() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), d = Object.seal({}), c = new a([b]);
      if (!c.has(b) || c.has(d)) {
        return !1;
      }
      c.delete(b);
      c.add(d);
      return !c.has(b) && c.has(d);
    } catch (f) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (d()) {
      return a;
    }
  }
  var c = function(a) {
    this.map_ = new WeakMap;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
  };
  c.prototype.add = function(a) {
    this.map_.set(a, !0);
    return this;
  };
  c.prototype.has = function(a) {
    return this.map_.has(a);
  };
  c.prototype.delete = function(a) {
    return this.map_.delete(a);
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  var a = {}, d = {}, c = {}, b = {}, e = new WeakSet([a, d, c, b]);
  e.deleteAll(a, c);
  return !e.has(a) && e.has(d) && !e.has(c) && e.has(b);
};

