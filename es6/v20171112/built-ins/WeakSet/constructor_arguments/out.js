var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
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
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + a++;
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
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
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
  var c = a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, c, b, d) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill("WeakMap", function(a) {
  function c(a) {
    $jscomp.owns(a, d) || $jscomp.defineProperty(a, d, {value:{}});
  }
  function b(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      c(a);
      return b(a);
    });
  }
  if (function() {
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
    } catch (g) {
      return !1;
    }
  }()) {
    return a;
  }
  var d = "$jscomp_hidden_" + Math.random().toString().substring(2);
  b("freeze");
  b("preventExtensions");
  b("seal");
  var e = 0, f = function(a) {
    this.id_ = (e += Math.random() + 1).toString();
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
    c(a);
    if (!$jscomp.owns(a, d)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[d][this.id_] = b;
    return this;
  };
  f.prototype.get = function(a) {
    return $jscomp.owns(a, d) ? a[d][this.id_] : void 0;
  };
  f.prototype.has = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_);
  };
  f.prototype.delete = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_) ? delete a[d][this.id_] : !1;
  };
  return f;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), c = Object.seal({}), e = new a([b]);
      if (!e.has(b) || e.has(c)) {
        return !1;
      }
      e.delete(b);
      e.add(c);
      return !e.has(b) && e.has(c);
    } catch (f) {
      return !1;
    }
  }()) {
    return a;
  }
  var c = function(a) {
    this.map_ = new WeakMap;
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
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
  var a = {}, c = {}, b = new WeakSet([a, c]);
  return b.has(a) && b.has(c);
};

