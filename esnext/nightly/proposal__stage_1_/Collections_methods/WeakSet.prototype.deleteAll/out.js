var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
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
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
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
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), b = Object.seal({}), c = new a([[d, 2], [b, 3]]);
      if (2 != c.get(d) || 3 != c.get(b)) {
        return !1;
      }
      c.delete(d);
      c.set(b, 4);
      return !c.has(d) && 4 == c.get(b);
    } catch (k) {
      return !1;
    }
  }
  function c() {
  }
  function d(a) {
    if (!$jscomp.owns(a, f)) {
      var d = new c;
      $jscomp.defineProperty(a, f, {value:d});
    }
  }
  function e(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      if (a instanceof c) {
        return a;
      }
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
  var f = "$jscomp_hidden_" + Math.random();
  e("freeze");
  e("preventExtensions");
  e("seal");
  var h = 0, g = function(a) {
    this.id_ = (h += Math.random() + 1).toString();
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  g.prototype.set = function(a, b) {
    d(a);
    if (!$jscomp.owns(a, f)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[f][this.id_] = b;
    return this;
  };
  g.prototype.get = function(a) {
    return $jscomp.owns(a, f) ? a[f][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_);
  };
  g.prototype.delete = function(a) {
    return $jscomp.owns(a, f) && $jscomp.owns(a[f], this.id_) ? delete a[f][this.id_] : !1;
  };
  return g;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), b = Object.seal({}), c = new a([d]);
      if (!c.has(d) || c.has(b)) {
        return !1;
      }
      c.delete(d);
      c.add(b);
      return !c.has(d) && c.has(b);
    } catch (h) {
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
  var a = {}, b = {}, c = {}, d = {}, e = new WeakSet([a, b, c, d]);
  e.deleteAll(a, c);
  return !e.has(a) && e.has(b) && !e.has(c) && e.has(d);
};

