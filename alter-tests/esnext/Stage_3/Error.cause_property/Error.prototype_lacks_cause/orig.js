// Stage 3 / Error.cause property / Error.prototype lacks cause
module.exports = () => {
  return !('cause' in Error.prototype);

};