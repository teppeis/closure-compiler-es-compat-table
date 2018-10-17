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
  for (var a = $jscomp.makeIterator([[1, 2, 3]]).next(); !a.done;) {
    var b = $jscomp.makeIterator(a.value);
    a = b.next().value;
    var c = b.next().value;
    b = b.next().value;
    return 1 === a && 2 === c && 3 === b;
  }
};

