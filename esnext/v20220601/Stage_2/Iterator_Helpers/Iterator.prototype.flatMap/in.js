// Stage 2 / Iterator Helpers / Iterator.prototype.flatMap
module.exports = () => {
  return Array.from([1, 2, 3].values().flatMap(it => [it, 0])).join() === '1,0,2,0,3,0';

};