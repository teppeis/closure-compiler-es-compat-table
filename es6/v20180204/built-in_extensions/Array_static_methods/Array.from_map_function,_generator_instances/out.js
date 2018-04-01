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
$jscomp.polyfill = function(a, c, b, d) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var f = a[d];
      f in b || (b[f] = {});
      b = b[f];
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.from", function(a) {
  return a ? a : function(a, b, d) {
    $jscomp.initSymbolIterator();
    b = null != b ? b : function(a) {
      return a;
    };
    var c = [], e = a[Symbol.iterator];
    if ("function" == typeof e) {
      for (a = e.call(a); !(e = a.next()).done;) {
        c.push(b.call(d, e.value));
      }
    } else {
      e = a.length;
      for (var g = 0; g < e; g++) {
        c.push(b.call(d, a[g]));
      }
    }
    return c;
  };
}, "es6", "es3");
module.exports = function() {
  var a = function() {
    function a(a, c, d) {
      for (;;) {
        switch(b) {
          case 0:
            return b = 1, {value:"foo", done:!1};
          case 1:
            if (1 != a) {
              b = 2;
              break;
            }
            b = -1;
            throw d;
          case 2:
            return b = 3, {value:"bar", done:!1};
          case 3:
            if (1 != a) {
              b = 4;
              break;
            }
            b = -1;
            throw d;
          case 4:
            return b = 5, {value:"bal", done:!1};
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
    var b = 0, d = {next:function(b) {
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
  return "food0,bard1,bald2" === Array.from(a, function(a, b) {
    return a + this.baz + b;
  }, {baz:"d"}) + "";
};

