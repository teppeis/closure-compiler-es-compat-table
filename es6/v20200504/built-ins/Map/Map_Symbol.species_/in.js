// built-ins / Map / Map[Symbol.species]
module.exports = () => {
  var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return 'get' in prop && Map[Symbol.species] === Map;

};