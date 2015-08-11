module.exports = function() {
  try {
    Math.max.apply(Math, [].concat(2));
  } catch (a) {
    return 3 === Math.max.apply(Math, [].concat([1, 2, 3]));
  }
};

