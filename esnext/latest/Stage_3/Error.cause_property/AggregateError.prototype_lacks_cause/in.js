// Stage 3 / Error.cause property / AggregateError.prototype lacks cause
module.exports = () => {
  return !('cause' in AggregateError.prototype);

};