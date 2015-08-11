module.exports = function() {
  var a = Object.create(global.__createIterableObject([1, 2])), d = a[0], e = a[1], a = a[2], c, b;
  b = Object.create(global.__createIterableObject([3, 4]));
  c = b[0];
  b = b[1];
  return 1 === d && 2 === e && void 0 === a && 3 === c && 4 === b;
};

