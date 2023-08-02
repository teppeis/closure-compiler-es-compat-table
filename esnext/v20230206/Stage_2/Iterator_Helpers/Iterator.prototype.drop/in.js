// Stage 2 / Iterator Helpers / Iterator.prototype.drop
module.exports = () => {
  return Array.from([1, 2, 3].values().drop(1)).join() === '2,3';

};