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
  function e() {
  }
  e.prototype = c.prototype;
  b.prototype = new e;
  b.prototype.constructor = b;
  for (var d in c) {
    if ($jscomp.global.Object.defineProperties) {
      var a = $jscomp.global.Object.getOwnPropertyDescriptor(c, d);
      void 0 !== a && $jscomp.global.Object.defineProperty(b, d, a);
    } else {
      b[d] = c[d];
    }
  }
}};
module.exports = function() {
  var b = "", c = __createIterableObject([1, 2, 3], {"return":function() {
    b += "a";
    return {done:!0};
  }}), e = function() {
    function d(d, g) {
      for (;;) {
        switch(a) {
          case 0:
            try {
              k = $jscomp.makeIterator(c);
            } catch (m) {
              f = m;
              a = 1;
              break;
            }
          ;
          case 5:
            try {
              if ((l = k.next(d)).done) {
                a = 6;
                break;
              }
              a = 7;
              return {value:l.value, done:!1};
            } catch (n) {
              f = n;
              a = 1;
              break;
            }
          ;
          case 7:
            try {
              if (void 0 === g) {
                a = 8;
                break;
              }
              h = 4;
              a = 2;
              break;
            } catch (p) {
              f = p;
              a = 1;
              break;
            }
          ;
          case 4:
            try {
              throw a = -1, g;
            } catch (q) {
              f = q;
              a = 1;
              break;
            }
          ;
          case 8:
            try {
              a = 5;
              break;
            } catch (r) {
              f = r;
              a = 1;
              break;
            }
          ;
          case 6:
            try {
              h = 3;
              a = 2;
              break;
            } catch (t) {
              f = t;
              a = 1;
              break;
            }
          ;
          case 1:
            throw e = f, a = -1, e;;
          case 2:
            b += "b";
            a = h;
            break;
          case 3:
            a = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var a = 0, e, l, k, h, f, g = {next:function(a) {
      return d(a, void 0);
    }, "throw":function(a) {
      return d(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    g[Symbol.iterator] = function() {
      return this;
    };
    return g;
  }();
  e.next();
  e["return"]();
  return "ab" === b;
};

