// proposal (stage 1) / Collections methods / Map.prototype.find
module.exports = () => {
  return new Map([[1, 2], [2, 3], [3, 4]]).find(it => it % 2) === 3;

};