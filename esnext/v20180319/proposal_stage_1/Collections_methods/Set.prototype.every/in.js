// proposal (stage 1) / Collections methods / Set.prototype.every
module.exports = function() {
  return new Set([1, 2, 3]).every(it => typeof it === "number");
};
