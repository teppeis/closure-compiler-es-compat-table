// built-in extensions / RegExp.prototype properties / RegExp[Symbol.species]
module.exports = function() {
  var prop = Object.getOwnPropertyDescriptor(RegExp, Symbol.species);
  return 'get' in prop && RegExp[Symbol.species] === RegExp;

};