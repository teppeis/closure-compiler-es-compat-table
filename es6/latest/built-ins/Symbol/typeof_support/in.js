// built-ins / Symbol / typeof support
module.exports = () => {
  return typeof Symbol() === "symbol";

};