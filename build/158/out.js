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
  function f() {
  }
  f.prototype = b.prototype;
  a.prototype = new f;
  a.prototype.constructor = a;
  for (var c in b) {
    if ($jscomp.global.Object.defineProperties) {
      var d = $jscomp.global.Object.getOwnPropertyDescriptor(b, c);
      void 0 !== d && $jscomp.global.Object.defineProperty(a, c, d);
    } else {
      a[c] = b[c];
    }
  }
}};
module.exports = function() {
  var a, b = function() {
    function b(g, e) {
      for (;;) {
        switch(c) {
          case 0:
            return c = 1, {value:5, done:!1};
          case 1:
            if (void 0 === e) {
              c = 2;
              break;
            }
            c = -1;
            throw e;;
          case 2:
            return h = l = g, c = 3, {value:6, done:!1};
          case 3:
            if (void 0 === e) {
              c = 4;
              break;
            }
            c = -1;
            throw e;;
          case 4:
            d = g, a = [h, d], c = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var c = 0, d, h, l, k = {next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    k[Symbol.iterator] = function() {
      return this;
    };
    return k;
  }();
  b.next();
  b.next("foo");
  b.next("bar");
  return "foo" === a[0] && "bar" === a[1];
};

