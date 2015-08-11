module.exports = function() {
  return 4 === Math.max.apply(Math, [].concat("1234"));
};

