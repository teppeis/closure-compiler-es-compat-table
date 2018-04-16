// proposal (stage 1) / Collections methods / Set.prototype.map
module.exports = () => {
  var set = new Set([1, 2, 3]).map(it => it * it);
  return set.size === 3
&& set.has(1)
&& set.has(4)
&& set.has(9);

};