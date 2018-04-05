// proposal (stage 1) / Collections methods / Set.prototype.find
module.exports = function() {
  return new Set([1, 2, 3]).find(it => !(it % 2)) === 2;
};
