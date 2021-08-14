// Stage 2 / Iterator Helpers / Iterator.prototype.map
module.exports = () => {
  return Array.from([1, 2, 3].values().map(it => it * it)).join() === '1,4,9';

};