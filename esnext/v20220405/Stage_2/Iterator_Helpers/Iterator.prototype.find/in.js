// Stage 2 / Iterator Helpers / Iterator.prototype.find
module.exports = () => {
  return [1, 2, 3].values().find(it => it % 2) === 1;

};