module.exports = function() {
  var a = global.__createIterableObject([1, 2, 3]);
  return 3 === Math.max.apply(Math, [].concat(a));
};

