// built-ins / Map / basic functionality
module.exports = () => {
  var key = {};
  var map = new Map();
  map.set(key, 123);
  return map.has(key) && map.get(key) === 123;

};