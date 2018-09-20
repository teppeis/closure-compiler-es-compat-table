var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
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
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
};
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
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
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
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
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
$jscomp.polyfill("WeakMap", function(a) {
  function b() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var g = Object.seal({}), b = Object.seal({}), c = new a([[g, 2], [b, 3]]);
      if (2 != c.get(g) || 3 != c.get(b)) {
        return !1;
      }
      c.delete(g);
      c.set(b, 4);
      return !c.has(g) && 4 == c.get(b);
    } catch (k) {
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
  var h = 0, f = function(a) {
    this.id_ = (h += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  f.prototype.set = function(a, b) {
    d(a);
    if (!$jscomp.owns(a, c)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[c][this.id_] = b;
    return this;
  };
  f.prototype.get = function(a) {
    return $jscomp.owns(a, c) ? a[c][this.id_] : void 0;
  };
  f.prototype.has = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_);
  };
  f.prototype.delete = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_) ? delete a[c][this.id_] : !1;
  };
  return f;
}, "es6", "es3");
module.exports = function() {
  var a = new WeakMap;
  return !1 === a.has(1) && void 0 === a.get(1) && !1 === a.delete(1);
};

