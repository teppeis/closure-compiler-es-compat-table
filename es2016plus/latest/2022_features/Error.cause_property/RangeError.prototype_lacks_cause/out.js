module.exports = function() {
  return !("cause" in RangeError.prototype);
};

