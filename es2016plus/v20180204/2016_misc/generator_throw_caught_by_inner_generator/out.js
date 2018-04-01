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
module.exports = function() {
  var a = function() {
    function a(a, c, d) {
      for (;;) {
        switch(b) {
          case 0:
            e = $jscomp.makeIterator(function() {
              function a(a, c, d) {
                for (;;) {
                  switch(b) {
                    case 0:
                      try {
                        return b = 3, {value:"foo", done:!1};
                      } catch (f) {
                        b = 1;
                        break;
                      }
                    case 3:
                      try {
                        if (1 != a) {
                          b = 4;
                          break;
                        }
                        b = -1;
                        throw d;
                      } catch (f) {
                        b = 1;
                        break;
                      }
                    case 4:
                      try {
                        b = 2;
                        break;
                      } catch (f) {
                        b = 1;
                        break;
                      }
                    case 1:
                      return b = -1, {value:void 0, done:!0};
                    case 2:
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
            }());
          case 1:
            if ((g = e.next(c)).done) {
              b = 2;
              break;
            }
            b = 3;
            return {value:g.value, done:!1};
          case 3:
            if (1 != a) {
              b = 4;
              break;
            }
            b = -1;
            throw d;
          case 4:
            b = 1;
            break;
          case 2:
            return b = 5, {value:"bar", done:!1};
          case 5:
            if (1 != a) {
              b = 6;
              break;
            }
            b = -1;
            throw d;
          case 6:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, g, e, d = {next:function(b) {
      return a(0.0, b, void 0);
    }, throw:function(b) {
      return a(1.0, void 0, b);
    }, return:function(a) {
      throw Error("Not yet implemented");
    }};
    $jscomp.initSymbolIterator();
    d[Symbol.iterator] = function() {
      return this;
    };
    return d;
  }();
  a.next();
  return "bar" === a["throw"]().value;
};

