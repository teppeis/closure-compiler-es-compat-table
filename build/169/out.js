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
  function c() {
  }
  c.prototype = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  for (var d in b) {
    if ($jscomp.global.Object.defineProperties) {
      var e = $jscomp.global.Object.getOwnPropertyDescriptor(b, d);
      void 0 !== e && $jscomp.global.Object.defineProperty(a, d, e);
    } else {
      a[d] = b[d];
    }
  }
}};
module.exports = function() {
  var a = function() {
    function b(h, d) {
      for (;;) {
        switch(a) {
          case 0:
            f = $jscomp.makeIterator(Object.create(__createIterableObject([5, 6, 7])));
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
    var a = 0, c, f, g = {next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    g[Symbol.iterator] = function() {
      return this;
    };
    return g;
  }(), b = a.next(), c = 5 === b.value && !1 === b.done, b = a.next(), c = c & (6 === b.value && !1 === b.done), b = a.next(), c = c & (7 === b.value && !1 === b.done), b = a.next();
  return c &= void 0 === b.value && !0 === b.done;
};

