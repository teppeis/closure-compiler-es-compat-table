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
  a.base = function(a, c, e) {
    var d = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, d);
  };
};
var $jscomp$templatelit$0 = ["foo", "bar\n", ""];
$jscomp$templatelit$0.raw = ["foo", "bar\\n", ""];
module.exports = function() {
  var a = $jscomp$templatelit$0;
  return a instanceof Array && "foo" === a[0] && "bar\n" === a[1] && "foo" === a.raw[0] && "bar\\n" === a.raw[1] && !0 && !0 && !0;
};

