// built-in extensions / RegExp.prototype properties / RegExp.prototype[Symbol.search]
module.exports = () => {
  return typeof RegExp.prototype[Symbol.search] === 'function';

};