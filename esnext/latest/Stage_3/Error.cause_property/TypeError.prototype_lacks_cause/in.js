// Stage 3 / Error.cause property / TypeError.prototype lacks cause
module.exports = () => {
  return !('cause' in TypeError.prototype);

};