// proposal (stage 1) / Collections methods / Map.prototype.merge
module.exports = function() {
  var map = new Map([[1, 4], [2, 5]]).merge(new Map([[2, 7], [3, 6]]));
  return map.size === 3
&& map.get(1) === 4
&& map.get(2) === 7
&& map.get(3) === 6;

};