// Stage 2 / Set methods / Set.prototype.difference
module.exports = () => {
  var set = new Set([1, 2, 3]).difference(new Set([3, 4]));
  return set.size === 2
&& set.has(1)
&& set.has(2);

};