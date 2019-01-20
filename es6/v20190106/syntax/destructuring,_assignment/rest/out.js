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
$jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
module.exports = function() {
  var a = $jscomp.makeIterator([3, 4, 5]);
  var b = a.next().value;
  a = $jscomp.arrayFromIterator(a);
  var c = $jscomp.makeIterator([6]);
  var d = c.next().value;
  c = $jscomp.arrayFromIterator(c);
  return 3 === b && a instanceof Array && "4,5" === a + "" && 6 === d && c instanceof Array && 0 === c.length;
};

