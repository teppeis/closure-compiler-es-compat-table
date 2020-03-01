var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var c = 0; c < a.length; ++c) {
    var d = a[c];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, c = Object.create(new $jscomp.global.Proxy(a, {get:function(d, b, f) {
      return d == a && "q" == b && f == c;
    }}));
    return !0 === c.q;
  } catch (d) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var c = 0;
  return function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
  a != Array.prototype && a != Object.prototype && (a[c] = d.value);
};
$jscomp.polyfill = function(a, c, d, b) {
  if (c) {
    d = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var f = a[b];
      f in d || (d[f] = {});
      d = d[f];
    }
    a = a[a.length - 1];
    b = d[a];
    c = c(b);
    c != b && null != c && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill("WeakMap", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var h = Object.seal({}), c = Object.seal({}), b = new a([[h, 2], [c, 3]]);
      if (2 != b.get(h) || 3 != b.get(c)) {
        return !1;
      }
      b.delete(h);
      b.set(c, 4);
      return !b.has(h) && 4 == b.get(c);
    } catch (m) {
      return !1;
    }
  }
  function d() {
  }
  function b(a) {
    var b = typeof a;
    return "object" === b && null !== a || "function" === b;
  }
  function f(a) {
    if (!$jscomp.owns(a, e)) {
      var b = new d;
      $jscomp.defineProperty(a, e, {value:b});
    }
  }
  function k(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof d) {
        return a;
      }
      f(a);
      return b(a);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (c()) {
      return a;
    }
  }
  var e = "$jscomp_hidden_" + Math.random();
  k("freeze");
  k("preventExtensions");
  k("seal");
  var l = 0, g = function(a) {
    this.id_ = (l += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  g.prototype.set = function(a, c) {
    if (!b(a)) {
      throw Error("Invalid WeakMap key");
    }
    f(a);
    if (!$jscomp.owns(a, e)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[e][this.id_] = c;
    return this;
  };
  g.prototype.get = function(a) {
    return b(a) && $jscomp.owns(a, e) ? a[e][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return b(a) && $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_);
  };
  g.prototype.delete = function(a) {
    return b(a) && $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1;
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), c = Object.seal({}), d = new a([b]);
      if (!d.has(b) || d.has(c)) {
        return !1;
      }
      d.delete(b);
      d.add(c);
      return !d.has(b) && d.has(c);
    } catch (e) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && $jscomp.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (c()) {
      return a;
    }
  }
  var d = function(a) {
    this.map_ = new WeakMap;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
  };
  d.prototype.add = function(a) {
    this.map_.set(a, !0);
    return this;
  };
  d.prototype.has = function(a) {
    return this.map_.has(a);
  };
  d.prototype.delete = function(a) {
    return this.map_.delete(a);
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  var a = {}, c = {}, d = WeakSet.from([a, c]);
  return d.has(a) + d.has(c);
};

