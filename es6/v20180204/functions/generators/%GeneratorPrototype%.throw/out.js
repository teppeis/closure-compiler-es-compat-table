var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, k) {
  a != Array.prototype && a != Object.prototype && (a[b] = k.value);
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
  var a = !1, b = function() {
    function b(b, f, g) {
      for (;;) {
        switch(c) {
          case 0:
            try {
              return c = 3, {value:5, done:!1};
            } catch (d) {
              e = d;
              c = 1;
              break;
            }
          case 3:
            try {
              if (1 != b) {
                c = 4;
                break;
              }
              c = -1;
              throw g;
            } catch (d) {
              e = d;
              c = 1;
              break;
            }
          case 4:
            try {
              return c = 5, {value:6, done:!1};
            } catch (d) {
              e = d;
              c = 1;
              break;
            }
          case 5:
            try {
              if (1 != b) {
                c = 6;
                break;
              }
              c = -1;
              throw g;
            } catch (d) {
              e = d;
              c = 1;
              break;
            }
          case 6:
            try {
              c = 2;
              break;
            } catch (d) {
              e = d;
              c = 1;
              break;
            }
          case 1:
            h = e, a = "foo" === h;
          case 2:
            c = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var c = 0, h, e, f = {next:function(a) {
      return b(0.0, a, void 0);
    }, throw:function(a) {
      return b(1.0, void 0, a);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    f[Symbol.iterator] = function() {
      return this;
    };
    return f;
  }();
  b.next();
  b.throw("foo");
  return a;
};

