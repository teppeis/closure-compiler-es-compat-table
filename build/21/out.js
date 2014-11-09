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
  for (var a = [], b = {i:0};2 > b.i;b = {i:b.i}, b.i++) {
    a.push(function(a) {
      return function() {
        return a.i;
      };
    }(b));
  }
  var b = 0 === a[0]() && 1 === a[1](), a = [], c = {i$0:void 0}, d;
  for (d in{a:1, b:1}) {
    c.i$0 = d, a.push(function(a) {
      return function() {
        return a.i$0;
      };
    }(c)), c = {i$0:c.i$0};
  }
  return b &= "a" === a[0]() && "b" === a[1]();
};

