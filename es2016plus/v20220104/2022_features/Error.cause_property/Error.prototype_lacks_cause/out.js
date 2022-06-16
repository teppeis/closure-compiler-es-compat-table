module.exports = function() {
  return !("cause" in Error.prototype);
};

