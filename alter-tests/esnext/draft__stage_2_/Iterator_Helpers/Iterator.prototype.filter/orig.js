// draft (stage 2) / Iterator Helpers / Iterator.prototype.filter
module.exports = () => {
  return Array.from([1, 2, 3].values().filter(it => it % 2)).join() === '1,3';

};