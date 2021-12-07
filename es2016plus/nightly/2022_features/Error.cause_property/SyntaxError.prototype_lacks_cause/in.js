// 2022 features / Error.cause property / SyntaxError.prototype lacks cause
module.exports = () => {
  return !('cause' in SyntaxError.prototype);

};