// subclassing / miscellaneous subclassables / Map is subclassable
module.exports = function() {
  var key = {};
  class M extends Map {}
  var map = new M();

  map.set(key, 123);

  return map instanceof M && map.has(key) && map.get(key) === 123;

};