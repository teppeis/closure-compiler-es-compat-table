// proposal (stage 1) / Collections methods / Set.prototype.filter
module.exports = function() {
  var set = new Set([1, 2, 3]).filter(it => it % 2);
  return set.size === 2
&& set.has(1)
&& set.has(3);

};