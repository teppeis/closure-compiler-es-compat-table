// proposal (stage 1) / Collections methods / Map.prototype.some
module.exports = () => {
  return new Map([[1, 4], [2, 5], [3, 6]]).some(it => it % 2);

};