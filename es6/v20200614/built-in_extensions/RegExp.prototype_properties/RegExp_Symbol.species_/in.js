// built-in extensions / RegExp.prototype properties / RegExp[Symbol.species]
module.exports = () => {
  var prop = Object.getOwnPropertyDescriptor(RegExp, Symbol.species);
  return 'get' in prop && RegExp[Symbol.species] === RegExp;

};