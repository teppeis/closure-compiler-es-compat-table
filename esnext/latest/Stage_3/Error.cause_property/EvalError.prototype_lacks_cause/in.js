// Stage 3 / Error.cause property / EvalError.prototype lacks cause
module.exports = () => {
  return !('cause' in EvalError.prototype);

};