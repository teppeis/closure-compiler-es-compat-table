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
  var a = function() {
  };
  a.prototype.qux = function(a) {
    return this.foo + a;
  };
  var b = function(b) {
    a.apply(this, arguments);
  };
  $jscomp.inherits(b, a);
  b.prototype.qux = function(b) {
    return a.prototype.qux.call(this, "bar" + b);
  };
  b = new b;
  b.foo = "foo";
  return "foobarbaz" === b.qux("baz");
};

