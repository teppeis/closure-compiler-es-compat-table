// proposal (stage 1) / Set methods / Set.prototype.xor
module.exports = () => {
  var set = new Set([1, 2]).xor(new Set([2, 3]));
  return set.size === 2
&& set.has(1)
&& set.has(3);

};