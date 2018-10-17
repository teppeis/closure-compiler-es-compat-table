// proposal (stage 1) / Collections methods / Map.prototype.filter
module.exports = () => {
  var map = new Map([[1, 4], [2, 5], [3, 6]]).filter(it => !(it % 2));
  return map.size === 2
&& map.get(1) === 4
&& map.get(3) === 6;

};