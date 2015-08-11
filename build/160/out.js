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
  function f() {
  }
  f.prototype = c.prototype;
  b.prototype = new f;
  b.prototype.constructor = b;
  for (var a in c) {
    if ($jscomp.global.Object.defineProperties) {
      var e = $jscomp.global.Object.getOwnPropertyDescriptor(c, a);
      void 0 !== e && $jscomp.global.Object.defineProperty(b, a, e);
    } else {
      b[a] = c[a];
    }
  }
}};
module.exports = function() {
  var b = !1, c = function() {
    function c(n, g) {
      for (;;) {
        switch(a) {
          case 0:
            try {
              return a = 3, {value:5, done:!1};
            } catch (f) {
              d = f;
              a = 1;
              break;
            }
          ;
          case 3:
            try {
              if (void 0 === g) {
                a = 4;
                break;
              }
              a = -1;
              throw g;
            } catch (h) {
              d = h;
              a = 1;
              break;
            }
          ;
          case 4:
            try {
              return a = 5, {value:6, done:!1};
            } catch (k) {
              d = k;
              a = 1;
              break;
            }
          ;
          case 5:
            try {
              if (void 0 === g) {
                a = 6;
                break;
              }
              a = -1;
              throw g;
            } catch (l) {
              d = l;
              a = 1;
              break;
            }
          ;
          case 6:
            try {
              a = 2;
              break;
            } catch (m) {
              d = m;
              a = 1;
              break;
            }
          ;
          case 1:
            e = d, b = "foo" === e;
          case 2:
            a = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var a = 0, e, d, h = {next:function(a) {
      return c(a, void 0);
    }, "throw":function(a) {
      return c(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    h[Symbol.iterator] = function() {
      return this;
    };
    return h;
  }();
  c.next();
  c["throw"]("foo");
  return b;
};

