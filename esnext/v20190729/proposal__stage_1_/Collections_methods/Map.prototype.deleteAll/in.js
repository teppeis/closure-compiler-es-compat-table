// proposal (stage 1) / Collections methods / Map.prototype.deleteAll
module.exports = () => {
  var map = new Map([[1, 2], [3, 4], [5, 6], [7, 8]]);
  map.deleteAll(1, 5)
  return map.size === 2
&& map.get(3) === 4
&& map.get(7) === 8;

};