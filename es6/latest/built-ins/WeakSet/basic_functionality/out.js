var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new $jscomp.global.Proxy(a, {get:function(c, e, f) {
      return c == a && "q" == e && f == b;
    }}));
    return !0 === b.q;
  } catch (c) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.polyfill = function(a, b, c, e) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var f = a[e];
      f in c || (c[f] = {});
      c = c[f];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var h = Object.seal({}), e = Object.seal({}), b = new a([[h, 2], [e, 3]]);
      if (2 != b.get(h) || 3 != b.get(e)) {
        return !1;
      }
      b.delete(h);
      b.set(e, 4);
      return !b.has(h) && 4 == b.get(e);
    } catch (l) {
      return !1;
    }
  }
  function c() {
  }
  function e(a) {
    if (!$jscomp.owns(a, d)) {
      var b = new c;
      $jscomp.defineProperty(a, d, {value:b});
    }
  }
  function f(a) {
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
    if (b()) {
      return a;
    }
  }
  var d = "$jscomp_hidden_" + Math.random();
  f("freeze");
  f("preventExtensions");
  f("seal");
  var k = 0, g = function(a) {
    this.id_ = (k += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  g.prototype.set = function(a, b) {
    e(a);
    if (!$jscomp.owns(a, d)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[d][this.id_] = b;
    return this;
  };
  g.prototype.get = function(a) {
    return $jscomp.owns(a, d) ? a[d][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_);
  };
  g.prototype.delete = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_) ? delete a[d][this.id_] : !1;
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function b() {
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
    } catch (k) {
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
  var a = {}, b = new WeakSet;
  b.add(a);
  b.add(a);
  return b.has(a);
};

