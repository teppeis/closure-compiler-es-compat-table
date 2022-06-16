// Stage 2 / Map.prototype.upsert / WeakMap.prototype.upsert
module.exports = () => {
  const a = {}, b = {};
  const map = new WeakMap([[a, 1]]);
  if (map.upsert(a, it => 2, () => 3) !== 2) return false;
  if (map.upsert(b, it => 2, () => 3) !== 3) return false;
  return map.get(a) === 2 && map.get(b) === 3;

};