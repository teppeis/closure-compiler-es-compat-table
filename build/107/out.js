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
  var b = 0;
  return{next:function() {
    return b == a.length ? {done:!0} : {done:!1, value:a[b++]};
  }};
};
$jscomp.copyProperties = function(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
};
$jscomp.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, g) {
    var f = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, f);
  };
};
module.exports = function() {
  var a = {}, b = !1;
  Object.defineProperty(new Proxy(a, {defineProperty:function(c, d, e) {
    b = c === a && "foo" === d && 5 === e.value;
  }}), "foo", {value:5});
  return b;
};

