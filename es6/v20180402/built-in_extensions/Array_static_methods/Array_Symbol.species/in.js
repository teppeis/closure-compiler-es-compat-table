// built-in extensions / Array static methods / Array[Symbol.species]
module.exports = function() {
  var prop = Object.getOwnPropertyDescriptor(Array, Symbol.species);
  return "get" in prop && Array[Symbol.species] === Array;
};
