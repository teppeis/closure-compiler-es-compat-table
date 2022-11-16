module.exports = function() {
  return !("cause" in ReferenceError.prototype);
};

