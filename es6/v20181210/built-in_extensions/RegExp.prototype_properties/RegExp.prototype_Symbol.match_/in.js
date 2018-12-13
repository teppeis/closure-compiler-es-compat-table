// built-in extensions / RegExp.prototype properties / RegExp.prototype[Symbol.match]
module.exports = () => {
  return typeof RegExp.prototype[Symbol.match] === 'function';

};