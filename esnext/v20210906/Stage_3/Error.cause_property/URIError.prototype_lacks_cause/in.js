// Stage 3 / Error.cause property / URIError.prototype lacks cause
module.exports = () => {
  return !('cause' in URIError.prototype);

};