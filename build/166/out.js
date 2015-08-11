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
    function b(h, d) {
      for (;;) {
        switch(a) {
          case 0:
            f = $jscomp.makeIterator("\ud842\udfb7\ud842\udfb6");
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
  }(), a = b.next(), c = "\ud842\udfb7" === a.value && !1 === a.done, a = b.next(), c = c & ("\ud842\udfb6" === a.value && !1 === a.done), a = b.next();
  return c &= void 0 === a.value && !0 === a.done;
};

