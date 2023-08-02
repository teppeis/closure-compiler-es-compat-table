// Stage 2 / Set methods / Set.prototype.intersection
module.exports = () => {
  var set = new Set([1, 2, 3]).intersection(new Set([2, 3, 4]));
  return set.size === 2
&& set.has(2)
&& set.has(3);

};