// draft (stage 2) / Iterator Helpers / Iterator.prototype.toArray
module.exports = () => {
  const array = [1, 2, 3].values().toArray();
  return Array.isArray(array) && array.join() === '1,2,3';

};