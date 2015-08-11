module.exports = function() {
  return 3 === Math.max.apply(Math, [].concat([1, 2, 3]));
};

