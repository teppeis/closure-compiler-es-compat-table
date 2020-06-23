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
  var a, b;
  var c = $jscomp.makeIterator(function() {
    var d = [1, 2], e = $jscomp.makeIterator(d);
    a = e.next().value;
    b = e.next().value;
    return d;
  }());
  var f = c.next().value;
  c = c.next().value;
  return 1 === f && 2 === c && 1 === a && 2 === b;
};

