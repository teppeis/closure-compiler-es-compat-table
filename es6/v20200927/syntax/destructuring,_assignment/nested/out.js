var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
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
  var a = $jscomp.makeIterator([9, {x:10}]);
  var b = a.next().value;
  var c = a.next().value;
  a = c.x;
  c = c.g;
  var d = $jscomp.makeIterator([12]).next().value;
  return 9 === b && 10 === a && void 0 === c && 12 === d;
};

