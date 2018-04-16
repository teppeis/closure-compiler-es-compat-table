// proposal (stage 1) / Collections methods / Map.prototype.mapValues
module.exports = () => {
  var map = new Map([[1, 4], [2, 5], [3, 6]]).mapValues((value, key) => value * value);
  return map.size === 3
&& map.get(1) === 16
&& map.get(2) === 25
&& map.get(3) === 36;

};