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
  a.base = function(a, b, e) {
    var d = Array.prototype.slice.call(arguments, 2);
    return c.prototype[b].apply(a, d);
  };
};
module.exports = function() {
  var a = function(a, b) {
    return 3 === (void 0 === a ? 1 : a) && 2 === (void 0 === b ? 2 : b);
  }(3), a = a & function(a, b) {
    return 1 === (void 0 === a ? 1 : a) && 3 === (void 0 === b ? 2 : b);
  }(void 0, 3);
  return a &= function(a, b) {
    return 5 === (void 0 === b ? a : b);
  }(5);
};

