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
  for (var f in c) {
    if ($jscomp.global.Object.defineProperties) {
      var e = $jscomp.global.Object.getOwnPropertyDescriptor(c, f);
      void 0 !== e && $jscomp.global.Object.defineProperty(b, f, e);
    } else {
      b[f] = c[f];
    }
  }
}};
module.exports = function() {
  var b = function() {
    function b(c, d) {
      for (;;) {
        switch(a) {
          case 0:
            return a = 1, {value:1, done:!1};
          case 1:
            if (void 0 === d) {
              a = 2;
              break;
            }
            a = -1;
            throw d;;
          case 2:
            return a = 3, {value:2, done:!1};
          case 3:
            if (void 0 === d) {
              a = 4;
              break;
            }
            a = -1;
            throw d;;
          case 4:
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
  }(), c = b[0], g = b[1], b = b[2], f, e;
  e = function() {
    function b(c, d) {
      for (;;) {
        switch(a) {
          case 0:
            return a = 1, {value:3, done:!1};
          case 1:
            if (void 0 === d) {
              a = 2;
              break;
            }
            a = -1;
            throw d;;
          case 2:
            return a = 3, {value:4, done:!1};
          case 3:
            if (void 0 === d) {
              a = 4;
              break;
            }
            a = -1;
            throw d;;
          case 4:
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
  }();
  f = e[0];
  e = e[1];
  return 1 === c && 2 === g && void 0 === b && 3 === f && 4 === e;
};

