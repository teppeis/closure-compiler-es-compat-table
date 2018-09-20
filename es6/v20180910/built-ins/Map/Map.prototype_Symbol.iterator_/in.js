// built-ins / Map / Map.prototype[Symbol.iterator]
module.exports = () => {
  return typeof Map.prototype[Symbol.iterator] === "function";

};