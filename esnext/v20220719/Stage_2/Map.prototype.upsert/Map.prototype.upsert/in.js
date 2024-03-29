// Stage 2 / Map.prototype.upsert / Map.prototype.upsert
module.exports = () => {
  const map = new Map([['a', 1]]);
  if (map.upsert('a', it => 2, () => 3) !== 2) return false;
  if (map.upsert('b', it => 2, () => 3) !== 3) return false;
  return Array.from(map).join() === 'a,2,b,3';

};