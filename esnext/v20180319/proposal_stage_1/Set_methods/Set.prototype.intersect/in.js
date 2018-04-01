// proposal (stage 1) / Set methods / Set.prototype.intersect
module.exports = function() {
  var set = new Set([1, 2, 3]).intersect(new Set([2, 3, 4]));
  return set.size === 2 && set.has(2) && set.has(3);
};
