// 2022 features / Error.cause property / TypeError.prototype lacks cause
module.exports = () => {
  return !('cause' in TypeError.prototype);

};