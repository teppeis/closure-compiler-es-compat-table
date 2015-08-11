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
  function g() {
  }
  g.prototype = c.prototype;
  b.prototype = new g;
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
  var b = function() {
    function b(h, d) {
      for (;;) {
        switch(a) {
          case 0:
            f = $jscomp.makeIterator([5]);
          case 1:
            if ((c = f.next(h)).done) {
              a = 2;
              break;
            }
            a = 3;
            return {value:c.value, done:!1};
          case 3:
            if (void 0 === d) {
              a = 4;
              break;
            }
            a = -1;
            throw d;;
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
    var a = 0, c, f, e = {next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    e[Symbol.iterator] = function() {
      return this;
    };
    return e;
  }(), b = b.next(), c = 5 === b.value && !1 === b.done, b = function() {
    function b(d, e) {
      for (;;) {
        switch(a) {
          case 0:
            f = $jscomp.makeIterator(5);
          case 1:
            if ((c = f.next(d)).done) {
              a = 2;
              break;
            }
            a = 3;
            return {value:c.value, done:!1};
          case 3:
            if (void 0 === e) {
              a = 4;
              break;
            }
            a = -1;
            throw e;;
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
    var a = 0, c, f, e = {next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    e[Symbol.iterator] = function() {
      return this;
    };
    return e;
  }();
  try {
    b.next();
  } catch (g) {
    return c;
  }
};

