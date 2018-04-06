// built-ins / Symbol / typeof support
module.exports = function() {
  return typeof Symbol() === "symbol";

};