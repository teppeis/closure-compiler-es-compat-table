// Stage 3 / Error.cause property / ReferenceError.prototype lacks cause
module.exports = () => {
  return !('cause' in ReferenceError.prototype);

};