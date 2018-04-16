// built-in extensions / Array.prototype methods / Array.prototype[Symbol.iterator]
module.exports = () => {
  return typeof Array.prototype[Symbol.iterator] === 'function';

};