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
  function a() {
    function a(f, c) {
      for (;;) {
        switch(b) {
          case 0:
            b = -1;
          default:
            return {value:void 0, done:!0};
        }
      }
    }
    var b = 0, c = {next:function(b) {
      return a(b, void 0);
    }, "throw":function(b) {
      return a(void 0, b);
    }};
    $jscomp.initSymbolIterator();
    c[Symbol.iterator] = function() {
      return this;
    };
    return c;
  }
  var b = Object.getPrototypeOf(a()), c = b === a.prototype, b = Object.getPrototypeOf(b);
  return c &= b !== Object.prototype && b === Object.getPrototypeOf(function() {
    function b(c, d) {
      for (;;) {
        switch(a) {
          case 0:
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
  }.prototype) && b.hasOwnProperty("next");
};

