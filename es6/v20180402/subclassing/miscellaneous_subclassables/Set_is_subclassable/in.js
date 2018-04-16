// subclassing / miscellaneous subclassables / Set is subclassable
module.exports = () => {
  var obj = {};
  class S extends Set {}
  var set = new S();
  set.add(123);
  set.add(123);
  return set instanceof S && set.has(123);

};