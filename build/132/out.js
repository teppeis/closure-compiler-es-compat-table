var $jscomp = {scope:{}}, $jscomp = $jscomp || {};
$jscomp.IteratorResult = function() {
};
$jscomp.Iterator = function() {
};
$jscomp.Iterable = function() {
};
$jscomp.Iterable.prototype.$$iterator = function() {
};
$jscomp.makeIterator = function(a) {
  if (a.$$iterator) {
    return a.$$iterator();
  }
  if (!(a instanceof Array)) {
    throw Error();
  }
  var c = 0;
  return{next:function() {
    return c == a.length ? {done:!0} : {done:!1, value:a[c++]};
  }};
};
$jscomp.copyProperties = function(a, c) {
  for (var b in c) {
    a[b] = c[b];
  }
};
$jscomp.inherits = function(a, c) {
  function b() {
  }
  b.prototype = c.prototype;
  a.superClass_ = c.prototype;
  a.prototype = new b;
  a.prototype.constructor = a;
  a.base = function(a, b, f) {
    var e = Array.prototype.slice.call(arguments, 2);
    return c.prototype[b].apply(a, e);
  };
};
module.exports = function() {
  var a = [3, 4, 5], c = a[0], a = [].slice.call(a, 1), b = [6], d = b[0], b = [].slice.call(b, 1);
  return 3 === c && a instanceof Array && "4,5" === a + "" && 6 === d && b instanceof Array && 0 === b.length;
};

