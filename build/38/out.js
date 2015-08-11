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
  function d() {
  }
  d.prototype = a.prototype;
  b.prototype = new d;
  b.prototype.constructor = b;
  for (var e in a) {
    if ($jscomp.global.Object.defineProperties) {
      var c = $jscomp.global.Object.getOwnPropertyDescriptor(a, e);
      void 0 !== c && $jscomp.global.Object.defineProperty(b, e, c);
    } else {
      b[e] = a[e];
    }
  }
}};
module.exports = function() {
  for (var b = "", a = function() {
    function b(a, d) {
      for (;;) {
        switch(c) {
          case 0:
            return c = 1, {value:1, done:!1};
          case 1:
            if (void 0 === d) {
              c = 2;
              break;
            }
            c = -1;
            throw d;;
          case 2:
            return c = 3, {value:2, done:!1};
          case 3:
            if (void 0 === d) {
              c = 4;
              break;
            }
            c = -1;
            throw d;;
          case 4:
            return c = 5, {value:3, done:!1};
          case 5:
            if (void 0 === d) {
              c = 6;
              break;
            }
            c = -1;
            throw d;;
          case 6:
            c = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var c = 0, a = {next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
    $jscomp.initSymbolIterator();
    a[Symbol.iterator] = function() {
      return this;
    };
    return a;
  }(), a = $jscomp.makeIterator(a), d = a.next();!d.done;d = a.next()) {
    b += d.value;
  }
  return "123" === b;
};

