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
  var b = 0;
  return {next:function() {
    return b == a.length ? {done:!0} : {done:!1, value:a[b++]};
  }};
}, inherits:function(a, b) {
  function d() {
  }
  d.prototype = b.prototype;
  a.prototype = new d;
  a.prototype.constructor = a;
  for (var c in b) {
    if ($jscomp.global.Object.defineProperties) {
      var e = $jscomp.global.Object.getOwnPropertyDescriptor(b, c);
      void 0 !== e && $jscomp.global.Object.defineProperty(a, c, e);
    } else {
      a[c] = b[c];
    }
  }
}};
module.exports = function() {
  var a, b = function() {
    function b(g, d) {
      for (;;) {
        switch(c) {
          case 0:
            return c = 1, {value:!1, done:!1};
          case 1:
            if (void 0 === d) {
              c = 2;
              break;
            }
            c = -1;
            throw d;;
          case 2:
            a = e = g, c = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var c = 0, e, f = {next:function(a) {
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
  b.next();
  b.next(!0);
  return a;
};

