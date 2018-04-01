module.exports = function() {
  return "get" in Object.getOwnPropertyDescriptor(Array, Symbol.species) && Array[Symbol.species] === Array;
};

