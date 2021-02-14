// draft (stage 2) / Iterator Helpers / Iterator.prototype.forEach
module.exports = () => {
  let result = '';
  [1, 2, 3].values().forEach(it => result += it);
  return result === '123';

};