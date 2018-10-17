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
  var a = $jscomp.makeIterator(Object.create(global.__createIterableObject([1, 2])));
  var b = a.next().value;
  var c = a.next().value;
  a = a.next().value;
  return 1 === b && 2 === c && void 0 === a;
};

