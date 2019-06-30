// proposal (stage 1) / Collections methods / Map.prototype.findKey
module.exports = () => {
  return new Map([[1, 2], [2, 3], [3, 4]]).findKey(it => it % 2) === 2;

};