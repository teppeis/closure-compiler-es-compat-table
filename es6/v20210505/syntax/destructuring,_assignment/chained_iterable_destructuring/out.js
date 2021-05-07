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
  var a = $jscomp;
  var b = a.makeIterator;
  var d = [1, 2];
  var c = $jscomp.makeIterator(d);
  var e = c.next().value;
  c = c.next().value;
  b = b.call(a, d);
  a = b.next().value;
  b = b.next().value;
  return 1 === a && 2 === b && 1 === e && 2 === c;
};

