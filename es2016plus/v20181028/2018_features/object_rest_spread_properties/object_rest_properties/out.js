var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayFromIterator = function(b) {
  for (var a, c = []; !(a = b.next()).done;) {
    c.push(a.value);
  }
  return c;
};
module.exports = function() {
  var b = {a:1, b:2, c:3}, a = Object.assign({}, b);
  b = b.a;
  a = (delete a.a, a);
  return 1 === b && void 0 === a.a && 2 === a.b && 3 === a.c;
};

