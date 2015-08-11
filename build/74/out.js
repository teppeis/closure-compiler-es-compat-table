module.exports = function() {
  var b = {a:1, x:2}, c = b.x, d = b.y, a = [3, 4], e = a[0], a = a[1];
  return 1 === b.a && 2 === c && 3 === e && 4 === a && void 0 === d;
};

