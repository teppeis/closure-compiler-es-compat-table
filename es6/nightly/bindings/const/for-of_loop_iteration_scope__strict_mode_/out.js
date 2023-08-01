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
  for (var a = [], b = $jscomp.makeIterator(["a", "b"]), d = b.next(), c = {}; !d.done; c = {i$jscomp$3:c.i$jscomp$3}, d = b.next()) {
    c.i$jscomp$3 = d.value, a.push(function(e) {
      return function() {
        return e.i$jscomp$3;
      };
    }(c));
  }
  return "a" === a[0]() && "b" === a[1]();
};

