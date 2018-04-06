// built-in extensions / String.prototype methods / String.prototype[Symbol.iterator]
module.exports = function() {
  return typeof String.prototype[Symbol.iterator] === 'function';

};