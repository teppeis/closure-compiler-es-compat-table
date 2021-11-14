module.exports = function() {
  return !("cause" in EvalError.prototype);
};

