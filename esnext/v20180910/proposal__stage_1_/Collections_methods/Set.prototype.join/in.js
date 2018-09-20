// proposal (stage 1) / Collections methods / Set.prototype.join
module.exports = () => {
  return new Set([1, 2, 3]).join('|') === '1|2|3';

};