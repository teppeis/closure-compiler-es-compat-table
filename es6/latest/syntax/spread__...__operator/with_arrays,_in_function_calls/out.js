module.exports = function() {
  return 3 === Math.max.apply(Math, [1, 2, 3]);
};

