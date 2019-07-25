module.exports = function() {
  var b = {b:2, c:3}, a = Object.assign({}, {a:1}, b);
  return a !== b && 6 === a.a + a.b + a.c;
};

