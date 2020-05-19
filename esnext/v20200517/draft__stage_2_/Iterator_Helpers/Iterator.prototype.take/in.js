// draft (stage 2) / Iterator Helpers / Iterator.prototype.take
module.exports = () => {
  return Array.from([1, 2, 3].values().take(2)).join() === '1,2';

};