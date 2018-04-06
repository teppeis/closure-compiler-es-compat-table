var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, e) {
  a != Array.prototype && a != Object.prototype && (a[c] = e.value);
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
module.exports = function() {
  var a = "", c = __createIterableObject([1, 2, 3], {"return":function() {
    a += "a";
    return {done:!0};
  }}), e = function() {
    function e(e, g, n) {
      for (;;) {
        switch(b) {
          case 0:
            try {
              k = $jscomp.makeIterator(c);
            } catch (d) {
              f = d;
              b = 1;
              break;
            }
          case 5:
            try {
              if ((l = k.next(g)).done) {
                b = 6;
                break;
              }
              b = 7;
              return {value:l.value, done:!1};
            } catch (d) {
              f = d;
              b = 1;
              break;
            }
          case 7:
            try {
              if (1 != e) {
                b = 8;
                break;
              }
              h = 4;
              b = 2;
              break;
            } catch (d) {
              f = d;
              b = 1;
              break;
            }
          case 4:
            try {
              throw b = -1, n;
            } catch (d) {
              f = d;
              b = 1;
              break;
            }
          case 8:
            try {
              b = 5;
              break;
            } catch (d) {
              f = d;
              b = 1;
              break;
            }
          case 6:
            try {
              h = 3;
              b = 2;
              break;
            } catch (d) {
              f = d;
              b = 1;
              break;
            }
          case 1:
            throw m = f, b = -1, m;
          case 2:
            a += "b";
            b = h;
            break;
          case 3:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, m, l, k, h, f, g = {next:function(a) {
      return e(0.0, a, void 0);
    }, throw:function(a) {
      return e(1.0, void 0, a);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    g[Symbol.iterator] = function() {
      return this;
    };
    return g;
  }();
  e.next();
  e["return"]();
  return "ab" === a;
};

