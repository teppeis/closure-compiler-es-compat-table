// 2022 features / Error.cause property / RangeError.prototype lacks cause
module.exports = () => {
  return !('cause' in RangeError.prototype);

};