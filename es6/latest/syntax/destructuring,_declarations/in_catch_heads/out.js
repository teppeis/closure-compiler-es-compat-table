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
  try {
    throw [1, 2];
  } catch (d) {
    var a = $jscomp.makeIterator(d), b = a.next().value;
    a = a.next().value;
    try {
      throw {k:3, l:4};
    } catch (e) {
      var c = e, f = c.k;
      c = c.l;
      return 1 === b && 2 === a && 3 === f && 4 === c;
    }
  }
};

