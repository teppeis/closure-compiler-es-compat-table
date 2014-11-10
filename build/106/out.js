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
  var a = {}, c = {value:"foo", configurable:!0}, b = Object.getOwnPropertyDescriptor(new Proxy(a, {getOwnPropertyDescriptor:function(b, d) {
    return b === a && "foo" === d && c;
  }}), "foo");
  return b.value === c.value && b.configurable === c.configurable && !1 === b.writable && !1 === b.enumerable;
};

