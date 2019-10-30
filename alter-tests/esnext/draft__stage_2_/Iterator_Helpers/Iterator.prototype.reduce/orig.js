// draft (stage 2) / Iterator Helpers / Iterator.prototype.reduce
module.exports = () => {
  return [1, 2, 3].values().reduce((a, b) => a + b) === 6;

};