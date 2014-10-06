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
  a.base = function(a, c, f) {
    var e = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, e);
  };
};
module.exports = function() {
  var a = {}, b = {}, c = {}, d = 0;
  a[Symbol.toPrimitive] = function(a) {
    d += "number" === a;
    return 0;
  };
  b[Symbol.toPrimitive] = function(a) {
    d += "string" === a;
    return 0;
  };
  c[Symbol.toPrimitive] = function(a) {
    d += "default" === a;
    return 0;
  };
  0 <= a;
  b in {};
  0 == c;
  return 3 === d;
};

