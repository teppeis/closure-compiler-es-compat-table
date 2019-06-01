// built-ins / Set / Set.prototype[Symbol.iterator]
module.exports = () => {
  return typeof Set.prototype[Symbol.iterator] === "function";

};