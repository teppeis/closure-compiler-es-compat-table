// proposal (stage 1) / Collections methods / Map.prototype.mapKeys
module.exports = function() {
  var map = new Map([[1, 4], [2, 5], [3, 6]]).mapKeys(
    (value, key) => key * key
  );
  return (
    map.size === 3 && map.get(1) === 4 && map.get(4) === 5 && map.get(9) === 6
  );
};
