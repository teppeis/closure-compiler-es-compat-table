// built-ins / Set / Set.prototype.size
module.exports = () => {
  var obj = {};
  var set = new Set();
  set.add(123);
  set.add(123);
  set.add(456);
  return set.size === 2;

};