module.exports = function() {
  var b = {a:1, b:2, c:3}, a = Object.assign({}, b);
  b = b.a;
  a = (delete a.a, a);
  return 1 === b && void 0 === a.a && 2 === a.b && 3 === a.c;
};

