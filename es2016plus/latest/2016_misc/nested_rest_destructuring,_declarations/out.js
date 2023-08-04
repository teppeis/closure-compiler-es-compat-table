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
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return $jscomp.arrayIterator(a);
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
};
$jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
};
module.exports = function() {
  var a = $jscomp.makeIterator([1, 2, 3, 4]), b = a.next().value, c = $jscomp.makeIterator($jscomp.arrayFromIterator(a));
  a = c.next().value;
  c = $jscomp.arrayFromIterator(c);
  return 1 === b && 2 === a && "3,4" === c + "";
};

