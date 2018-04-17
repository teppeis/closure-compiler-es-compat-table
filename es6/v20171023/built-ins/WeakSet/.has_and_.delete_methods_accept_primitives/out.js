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
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var f = a[d];
      f in c || (c[f] = {});
      c = c[f];
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
  function b(a) {
    $jscomp.owns(a, d) || $jscomp.defineProperty(a, d, {value:{}});
  }
  function c(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      b(a);
      return c(a);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), b = Object.seal({}), d = new a([[c, 2], [b, 3]]);
      if (2 != d.get(c) || 3 != d.get(b)) {
        return !1;
      }
      d.delete(c);
      d.set(b, 4);
      return !d.has(c) && 4 == d.get(b);
    } catch (g) {
      return !1;
    }
  }()) {
    return a;
  }
  var d = "$jscomp_hidden_" + Math.random().toString().substring(2);
  c("freeze");
  c("preventExtensions");
  c("seal");
  var f = 0, e = function(a) {
    this.id_ = (f += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  e.prototype.set = function(a, c) {
    b(a);
    if (!$jscomp.owns(a, d)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[d][this.id_] = c;
    return this;
  };
  e.prototype.get = function(a) {
    return $jscomp.owns(a, d) ? a[d][this.id_] : void 0;
  };
  e.prototype.has = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_);
  };
  e.prototype.delete = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_) ? delete a[d][this.id_] : !1;
  };
  return e;
}, "es6", "es3");
$jscomp.polyfill("WeakSet", function(a) {
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), d = Object.seal({}), b = new a([c]);
      if (!b.has(c) || b.has(d)) {
        return !1;
      }
      b.delete(c);
      b.add(d);
      return !b.has(c) && b.has(d);
    } catch (e) {
      return !1;
    }
  }()) {
    return a;
  }
  var b = function(a) {
    this.map_ = new WeakMap;
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        this.add(c.value);
      }
    }
  };
  b.prototype.add = function(a) {
    this.map_.set(a, !0);
    return this;
  };
  b.prototype.has = function(a) {
    return this.map_.has(a);
  };
  b.prototype.delete = function(a) {
    return this.map_.delete(a);
  };
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = new WeakSet;
  return !1 === a.has(1) && !1 === a.delete(1);
};

