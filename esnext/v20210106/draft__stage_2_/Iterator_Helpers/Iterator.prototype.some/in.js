// draft (stage 2) / Iterator Helpers / Iterator.prototype.some
module.exports = () => {
  return [1, 2, 3].values().some(it => typeof it === 'number');

};