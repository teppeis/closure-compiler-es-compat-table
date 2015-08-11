var $jscomp = {scope:{}, global:this, initSymbolIterator:function() {
  Symbol = $jscomp.global.Symbol || {};
  Symbol.iterator || (Symbol.iterator = "$jscomp$iterator");
  $jscomp.initSymbolIterator = function() {
  };
}, makeIterator:function(a) {
  $jscomp.initSymbolIterator();
  if (a[Symbol.iterator]) {
    return a[Symbol.iterator]();
  }
  if (!(a instanceof Array) && "string" != typeof a) {
    throw Error();
  }
  var c = 0;
  return {next:function() {
    return c == a.length ? {done:!0} : {done:!1, value:a[c++]};
  }};
}, inherits:function(a, c) {
  function e() {
  }
  e.prototype = c.prototype;
  a.prototype = new e;
  a.prototype.constructor = a;
  for (var b in c) {
    if ($jscomp.global.Object.defineProperties) {
      var f = $jscomp.global.Object.getOwnPropertyDescriptor(c, b);
      void 0 !== f && $jscomp.global.Object.defineProperty(a, b, f);
    } else {
      a[b] = c[b];
    }
  }
}};
module.exports = function() {
  function a() {
    function a(h, d) {
      for (;;) {
        switch(b) {
          case 0:
            return b = 1, {value:c.x, done:!1};
          case 1:
            if (void 0 === d) {
              b = 2;
              break;
            }
            b = -1;
            throw d;;
          case 2:
            return b = 3, {value:c.y, done:!1};
          case 3:
            if (void 0 === d) {
              b = 4;
              break;
            }
            b = -1;
            throw d;;
          case 4:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, c = this, g = {next:function(b) {
      return a(b, void 0);
    }, "throw":function(b) {
      return a(void 0, b);
    }};
    $jscomp.initSymbolIterator();
    g[Symbol.iterator] = function() {
      return this;
    };
    return g;
  }
  try {
    (new a).next();
  } catch (c) {
    return !0;
  }
};

