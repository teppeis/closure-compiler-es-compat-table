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
  var d = 0;
  return {next:function() {
    return d == b.length ? {done:!0} : {done:!1, value:b[d++]};
  }};
}, inherits:function(b, d) {
  function a() {
  }
  a.prototype = d.prototype;
  b.prototype = new a;
  b.prototype.constructor = b;
  for (var c in d) {
    if ($jscomp.global.Object.defineProperties) {
      var e = $jscomp.global.Object.getOwnPropertyDescriptor(d, c);
      void 0 !== e && $jscomp.global.Object.defineProperty(b, c, e);
    } else {
      b[c] = d[c];
    }
  }
}};
module.exports = function() {
  var b = function() {
    function b(d, c) {
      for (;;) {
        switch(a) {
          case 0:
            return a = 1, {value:1, done:!1};
          case 1:
            if (void 0 === c) {
              a = 2;
              break;
            }
            a = -1;
            throw c;;
          case 2:
            return a = 3, {value:2, done:!1};
          case 3:
            if (void 0 === c) {
              a = 4;
              break;
            }
            a = -1;
            throw c;;
          case 4:
            return a = 5, {value:3, done:!1};
          case 5:
            if (void 0 === c) {
              a = 6;
              break;
            }
            a = -1;
            throw c;;
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
  }();
  return 3 === Math.max.apply(Math, [].concat(b));
};

