// built-in extensions / RegExp.prototype properties / RegExp.prototype[Symbol.split]
module.exports = function() {
  return typeof RegExp.prototype[Symbol.split] === "function";
};
