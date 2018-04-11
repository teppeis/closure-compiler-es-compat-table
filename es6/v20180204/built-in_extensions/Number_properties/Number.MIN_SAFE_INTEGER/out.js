module.exports = function() {
  return Number.MIN_SAFE_INTEGER === -(Math.pow(2, 53) - 1);
};

