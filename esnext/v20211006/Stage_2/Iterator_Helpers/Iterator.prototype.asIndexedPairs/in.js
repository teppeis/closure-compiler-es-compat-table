// Stage 2 / Iterator Helpers / Iterator.prototype.asIndexedPairs
module.exports = () => {
  return Array.from([1, 2, 3].values().asIndexedPairs()).join() === '0,1,1,2,2,3';

};