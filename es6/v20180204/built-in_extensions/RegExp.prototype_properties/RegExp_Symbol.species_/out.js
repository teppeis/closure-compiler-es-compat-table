module.exports = function() {
  return "get" in Object.getOwnPropertyDescriptor(RegExp, Symbol.species) && RegExp[Symbol.species] === RegExp;
};

