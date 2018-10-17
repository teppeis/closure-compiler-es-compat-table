var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
module.exports = function() {
  $jscomp.initSymbolIterator();
  var a = "", b = global.__createIterableObject([1, 2, 3]);
  b = $jscomp.makeIterator(b);
  for (var c = b.next(); !c.done; c = b.next()) {
    a += c.value;
  }
  return "123" === a;
};

