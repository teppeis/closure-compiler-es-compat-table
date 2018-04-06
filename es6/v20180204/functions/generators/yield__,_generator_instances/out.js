var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, c) {
  b != Array.prototype && b != Object.prototype && (b[a] = c.value);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var b = 0;
  return function(a) {
    return $jscomp.SYMBOL_PREFIX + (a || "") + b++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(b) {
  var a = 0;
  return $jscomp.iteratorPrototype(function() {
    return a < b.length ? {done:!1, value:b[a++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {next:b};
  b[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return b;
};
$jscomp.makeIterator = function(b) {
  $jscomp.initSymbolIterator();
  var a = b[Symbol.iterator];
  return a ? a.call(b) : $jscomp.arrayIterator(b);
};
module.exports = function() {
  var b = function() {
    function b(b, d, g) {
      for (;;) {
        switch(a) {
          case 0:
            f = $jscomp.makeIterator(function() {
              function b(b, c, e) {
                for (;;) {
                  switch(a) {
                    case 0:
                      return a = 1, {value:5, done:!1};
                    case 1:
                      if (1 != b) {
                        a = 2;
                        break;
                      }
                      a = -1;
                      throw e;
                    case 2:
                      return a = 3, {value:6, done:!1};
                    case 3:
                      if (1 != b) {
                        a = 4;
                        break;
                      }
                      a = -1;
                      throw e;
                    case 4:
                      return a = 5, {value:7, done:!1};
                    case 5:
                      if (1 != b) {
                        a = 6;
                        break;
                      }
                      a = -1;
                      throw e;
                    case 6:
                      a = -1;
                    default:
                      return {value:void 0, done:!0};
                  }
                }
              }
              var a = 0, c = {next:function(a) {
                return b(0.0, a, void 0);
              }, throw:function(a) {
                return b(1.0, void 0, a);
              }, return:function(a) {
                throw Error("Not yet implemented");
              }};
              $jscomp.initSymbolIterator();
              c[Symbol.iterator] = function() {
                return this;
              };
              return c;
            }());
          case 1:
            if ((c = f.next(d)).done) {
              a = 2;
              break;
            }
            a = 3;
            return {value:c.value, done:!1};
          case 3:
            if (1 != b) {
              a = 4;
              break;
            }
            a = -1;
            throw g;
          case 4:
            a = 1;
            break;
          case 2:
            a = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var a = 0, c, f, d = {next:function(a) {
      return b(0.0, a, void 0);
    }, throw:function(a) {
      return b(1.0, void 0, a);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    d[Symbol.iterator] = function() {
      return this;
    };
    return d;
  }(), a = b.next(), c = 5 === a.value && !1 === a.done;
  a = b.next();
  c &= 6 === a.value && !1 === a.done;
  a = b.next();
  c &= 7 === a.value && !1 === a.done;
  a = b.next();
  return c &= void 0 === a.value && !0 === a.done;
};

