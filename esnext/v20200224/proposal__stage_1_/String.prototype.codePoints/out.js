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
  for (var a = [], b = $jscomp.makeIterator("a\ud842\udfb7b".codePoints()), c = b.next(); !c.done; c = b.next()) {
    a.push(c.value);
  }
  return 3 === a.length && 97 === a[0].codePoint && 0 === a[0].position && 134071 === a[1].codePoint && 1 === a[1].position && 98 === a[2].codePoint && 3 === a[2].position;
};

