// built-ins / Map / Map[Symbol.species]
module.exports = function() {
  var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return 'get' in prop && Map[Symbol.species] === Map;

};