var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
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
$jscomp.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill = function(a, b, d, c) {
  if (b) {
    d = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var f = a[c];
      f in d || (d[f] = {});
      d = d[f];
    }
    a = a[a.length - 1];
    c = d[a];
    b = b(c);
    b != c && null != b && $jscomp.defineProperty(d, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function b(a) {
    $jscomp.owns(a, c) || $jscomp.defineProperty(a, c, {value:{}});
  }
  function d(a) {
    var e = Object[a];
    e && (Object[a] = function(a) {
      b(a);
      return e(a);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({}), b = Object.seal({}), c = new a([[e, 2], [b, 3]]);
      if (2 != c.get(e) || 3 != c.get(b)) {
        return !1;
      }
      c.delete(e);
      c.set(b, 4);
      return !c.has(e) && 4 == c.get(b);
    } catch (h) {
      return !1;
    }
  }()) {
    return a;
  }
  var c = "$jscomp_hidden_" + Math.random().toString().substring(2);
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
  g.prototype.set = function(a, d) {
    b(a);
    if (!$jscomp.owns(a, c)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[c][this.id_] = d;
    return this;
  };
  g.prototype.get = function(a) {
    return $jscomp.owns(a, c) ? a[c][this.id_] : void 0;
  };
  g.prototype.has = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_);
  };
  g.prototype.delete = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_) ? delete a[c][this.id_] : !1;
  };
  return g;
}, "es6", "es3");
module.exports = function() {
  var a = !1, b = WeakMap.prototype.set;
  WeakMap.prototype.set = function(b, c) {
    a = !0;
  };
  new WeakMap([[{}, 42]]);
  WeakMap.prototype.set = b;
  return a;
};

