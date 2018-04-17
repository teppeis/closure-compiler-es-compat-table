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
module.exports = function() {
  function a() {
    function a(a, c, d) {
      for (;;) {
        switch(b) {
          case 0:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, c = {next:function(b) {
      return a(0.0, b, void 0);
    }, throw:function(b) {
      return a(1.0, void 0, b);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    c[Symbol.iterator] = function() {
      return this;
    };
    return c;
  }
  var c = (new a.constructor("a", "b", "c", "yield a; yield b; yield c;"))(5, 6, 7), b = c.next(), d = 5 === b.value && !1 === b.done;
  b = c.next();
  d &= 6 === b.value && !1 === b.done;
  b = c.next();
  d &= 7 === b.value && !1 === b.done;
  b = c.next();
  d &= void 0 === b.value && !0 === b.done;
  return d &= a.constructor === function() {
    function a(a, c, d) {
      for (;;) {
        switch(b) {
          case 0:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, c = {next:function(b) {
      return a(0.0, b, void 0);
    }, throw:function(b) {
      return a(1.0, void 0, b);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    c[Symbol.iterator] = function() {
      return this;
    };
    return c;
  }.constructor;
};

