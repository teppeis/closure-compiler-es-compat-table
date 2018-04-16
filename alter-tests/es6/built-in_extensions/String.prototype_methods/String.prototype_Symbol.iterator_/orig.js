// built-in extensions / String.prototype methods / String.prototype[Symbol.iterator]
module.exports = () => {
  return typeof String.prototype[Symbol.iterator] === 'function';

};