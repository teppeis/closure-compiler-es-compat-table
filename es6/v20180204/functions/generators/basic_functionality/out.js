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
module.exports = function() {
  var a = function() {
    function a(a, c, d) {
      for (;;) {
        switch(b) {
          case 0:
            return b = 1, {value:5, done:!1};
          case 1:
            if (1 != a) {
              b = 2;
              break;
            }
            b = -1;
            throw d;
          case 2:
            return b = 3, {value:6, done:!1};
          case 3:
            if (1 != a) {
              b = 4;
              break;
            }
            b = -1;
            throw d;
          case 4:
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
  }(), b = a.next(), c = 5 === b.value && !1 === b.done;
  b = a.next();
  c &= 6 === b.value && !1 === b.done;
  b = a.next();
  return c &= void 0 === b.value && !0 === b.done;
};

