// proposal (stage 1) / Set methods / Set.prototype.union
module.exports = function() {
  var set = new Set([1, 2]).union(new Set([2, 3]));
  return set.size === 3 && set.has(1) && set.has(2) && set.has(3);
};
