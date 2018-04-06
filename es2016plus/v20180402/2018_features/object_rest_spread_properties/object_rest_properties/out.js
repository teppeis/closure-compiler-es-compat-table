module.exports = function() {
  var a = {a:1, b:2, c:3}, b = a.a;
  a = (delete a.a, a);
  return 1 === b && void 0 === a.a && 2 === a.b && 3 === a.c;
};

