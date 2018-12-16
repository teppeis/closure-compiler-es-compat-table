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
  var a = {b:2, z:void 0};
  var b = void 0 === a.a ? 1 : a.a;
  var f = void 0 === a.b ? 0 : a.b;
  a = void 0 === a.z ? 3 : a.z;
  var c = $jscomp.makeIterator([4, , void 0]);
  var d = c.next().value;
  d = void 0 === d ? 0 : d;
  var e = c.next().value;
  e = void 0 === e ? 5 : e;
  c = c.next().value;
  return 1 === b && 2 === f && 3 === a && 4 === d && 5 === e && 6 === (void 0 === c ? 6 : c);
};

