// built-ins / Set / basic functionality
module.exports = () => {
  var obj = {};
  var set = new Set();
  set.add(123);
  set.add(123);
  return set.has(123);

};