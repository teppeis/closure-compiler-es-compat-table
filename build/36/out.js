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
  for (var a = "", b = $jscomp.makeIterator("foo"), c = b.next();!c.done;c = b.next()) {
    a += c.value;
  }
  return "foo" === a;
};

