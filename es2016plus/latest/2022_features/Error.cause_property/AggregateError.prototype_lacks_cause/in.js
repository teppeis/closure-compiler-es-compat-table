// 2022 features / Error.cause property / AggregateError.prototype lacks cause
module.exports = () => {
  return !('cause' in AggregateError.prototype);

};