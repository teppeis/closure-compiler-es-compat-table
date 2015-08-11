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
  var a = 0;
  return {next:function() {
    return a == b.length ? {done:!0} : {done:!1, value:b[a++]};
  }};
}, inherits:function(b, a) {
  function c() {
  }
  c.prototype = a.prototype;
  b.prototype = new c;
  b.prototype.constructor = b;
  for (var d in a) {
    if ($jscomp.global.Object.defineProperties) {
      var e = $jscomp.global.Object.getOwnPropertyDescriptor(a, d);
      void 0 !== e && $jscomp.global.Object.defineProperty(b, d, e);
    } else {
      b[d] = a[d];
    }
  }
}};
module.exports = function() {
  var b = function() {
    function a(h, d) {
      for (;;) {
        switch(b) {
          case 0:
            f = $jscomp.makeIterator(function() {
              function b(c, d) {
                for (;;) {
                  switch(a) {
                    case 0:
                      return a = 1, {value:5, done:!1};
                    case 1:
                      if (void 0 === d) {
                        a = 2;
                        break;
                      }
                      a = -1;
                      throw d;;
                    case 2:
                      return a = 3, {value:6, done:!1};
                    case 3:
                      if (void 0 === d) {
                        a = 4;
                        break;
                      }
                      a = -1;
                      throw d;;
                    case 4:
                      return a = 5, {value:7, done:!1};
                    case 5:
                      if (void 0 === d) {
                        a = 6;
                        break;
                      }
                      a = -1;
                      throw d;;
                    case 6:
                      a = -1;
                    default:
                      return {value:void 0, done:!0};
                  }
                }
              }
              var a = 0, c = {next:function(a) {
                return b(a, void 0);
              }, "throw":function(a) {
                return b(void 0, a);
              }};
              $jscomp.initSymbolIterator();
              c[Symbol.iterator] = function() {
                return this;
              };
              return c;
            }());
          case 1:
            if ((c = f.next(h)).done) {
              b = 2;
              break;
            }
            b = 3;
            return {value:c.value, done:!1};
          case 3:
            if (void 0 === d) {
              b = 4;
              break;
            }
            b = -1;
            throw d;;
          case 4:
            b = 1;
            break;
          case 2:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, c, f, g = {next:function(b) {
      return a(b, void 0);
    }, "throw":function(b) {
      return a(void 0, b);
    }};
    $jscomp.initSymbolIterator();
    g[Symbol.iterator] = function() {
      return this;
    };
    return g;
  }(), a = b.next(), c = 5 === a.value && !1 === a.done, a = b.next(), c = c & (6 === a.value && !1 === a.done), a = b.next(), c = c & (7 === a.value && !1 === a.done), a = b.next();
  return c &= void 0 === a.value && !0 === a.done;
};

