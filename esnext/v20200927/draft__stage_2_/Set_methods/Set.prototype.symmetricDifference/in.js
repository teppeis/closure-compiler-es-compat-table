// draft (stage 2) / Set methods / Set.prototype.symmetricDifference
module.exports = () => {
  var set = new Set([1, 2]).symmetricDifference(new Set([2, 3]));
  return set.size === 2
&& set.has(1)
&& set.has(3);

};