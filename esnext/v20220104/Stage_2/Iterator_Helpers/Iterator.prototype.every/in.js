// Stage 2 / Iterator Helpers / Iterator.prototype.every
module.exports = () => {
  return [1, 2, 3].values().every(it => typeof it === 'number');

};