module.exports = function() {
  var a = [5, null, [6]], d = a[0], e = a[2][0], a = a[3], c, b;
  b = [7, 8];
  c = b[0];
  b = b[1];
  return 5 === d && 6 === e && void 0 === a && 7 === c && 8 === b;
};

