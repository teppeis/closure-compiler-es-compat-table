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
module.exports = function() {
  var a = {b:2, c:void 0, x:4}, b = void 0 === a.a ? 1 : a.a, f = void 0 === a.b ? 0 : a.b, g = void 0 === a.c ? 3 : a.c, h = void 0 === a.x ? 0 : a.x;
  a = void 0 === a.y ? 5 : a.y;
  var c = $jscomp.makeIterator([, 7, void 0]), d = c.next().value;
  d = void 0 === d ? 6 : d;
  var e = c.next().value;
  e = void 0 === e ? 0 : e;
  c = c.next().value;
  return 1 === b && 2 === f && 3 === g && 4 === h && 5 === a && 6 === d && 7 === e && 8 === (void 0 === c ? 8 : c);
};

