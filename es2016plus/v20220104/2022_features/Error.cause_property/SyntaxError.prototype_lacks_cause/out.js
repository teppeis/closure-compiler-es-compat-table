module.exports = function() {
  return !("cause" in SyntaxError.prototype);
};

