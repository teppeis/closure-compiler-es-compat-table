// proposal (stage 1) / Collections methods / Set.prototype.addAll
module.exports = () => {
  var set = new Set([1, 2]).addAll(2, 3);
  return set.size === 3
&& set.has(1)
&& set.has(2)
&& set.has(3);

};