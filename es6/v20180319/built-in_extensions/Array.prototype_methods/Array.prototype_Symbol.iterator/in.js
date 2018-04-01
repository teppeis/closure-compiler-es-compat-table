// built-in extensions / Array.prototype methods / Array.prototype[Symbol.iterator]
module.exports = function() {
return typeof Array.prototype[Symbol.iterator] === 'function';
      
};