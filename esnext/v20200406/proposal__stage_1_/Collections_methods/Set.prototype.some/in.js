// proposal (stage 1) / Collections methods / Set.prototype.some
module.exports = () => {
  return new Set([1, 2, 3]).some(it => it % 2);

};