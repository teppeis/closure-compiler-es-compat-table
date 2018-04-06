module.exports = function() {
  return Math.fscale(3, 1, 2, 1, Math.PI) === Math.fround(2 * (Math.PI - 1) + 1);
};

