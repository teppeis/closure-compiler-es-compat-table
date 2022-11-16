module.exports = function() {
  return !("cause" in TypeError.prototype);
};

