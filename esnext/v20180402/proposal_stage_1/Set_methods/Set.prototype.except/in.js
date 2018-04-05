// proposal (stage 1) / Set methods / Set.prototype.except
module.exports = function() {
  var set = new Set([1, 2, 3]).except(new Set([3, 4]));
  return set.size === 2 && set.has(1) && set.has(2);
};
