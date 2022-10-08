// 2022 features / Error.cause property / ReferenceError.prototype lacks cause
module.exports = () => {
  return !('cause' in ReferenceError.prototype);

};