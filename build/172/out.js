var $jscomp = {scope:{}, global:this, initSymbolIterator:function() {
  Symbol = $jscomp.global.Symbol || {};
  Symbol.iterator || (Symbol.iterator = "$jscomp$iterator");
  $jscomp.initSymbolIterator = function() {
  };
}, makeIterator:function(b) {
  $jscomp.initSymbolIterator();
  if (b[Symbol.iterator]) {
    return b[Symbol.iterator]();
  }
  if (!(b instanceof Array) && "string" != typeof b) {
    throw Error();
  }
  var c = 0;
  return {next:function() {
    return c == b.length ? {done:!0} : {done:!1, value:b[c++]};
  }};
}, inherits:function(b, c) {
  function d() {
  }
  d.prototype = c.prototype;
  b.prototype = new d;
  b.prototype.constructor = b;
  for (var e in c) {
    if ($jscomp.global.Object.defineProperties) {
      var a = $jscomp.global.Object.getOwnPropertyDescriptor(c, e);
      void 0 !== a && $jscomp.global.Object.defineProperty(b, e, a);
    } else {
      b[e] = c[e];
    }
  }
}};
module.exports = function() {
  var b = !1, c = global.__createIterableObject([1, 2, 3], {"throw":void 0, "return":function() {
    b = !0;
    return {done:!0};
  }}), d = function() {
    function b(h, e) {
      for (;;) {
        switch(a) {
          case 0:
            try {
              g = $jscomp.makeIterator(c);
            } catch (f) {
              a = 1;
              break;
            }
          ;
          case 3:
            try {
              if ((d = g.next(h)).done) {
                a = 4;
                break;
              }
              a = 5;
              return {value:d.value, done:!1};
            } catch (k) {
              a = 1;
              break;
            }
          ;
          case 5:
            try {
              if (void 0 === e) {
                a = 6;
                break;
              }
              a = -1;
              throw e;
            } catch (l) {
              a = 1;
              break;
            }
          ;
          case 6:
            try {
              a = 3;
              break;
            } catch (m) {
              a = 1;
              break;
            }
          ;
          case 4:
            try {
              a = 2;
              break;
            } catch (n) {
              a = 1;
              break;
            }
          ;
          case 1:
          ;
          case 2:
            a = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var a = 0, d, g, f = {next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    f[Symbol.iterator] = function() {
      return this;
    };
    return f;
  }();
  d.next();
  d["throw"]();
  return b;
};

