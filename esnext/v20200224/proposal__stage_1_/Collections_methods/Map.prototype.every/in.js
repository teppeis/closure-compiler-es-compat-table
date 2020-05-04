// proposal (stage 1) / Collections methods / Map.prototype.every
module.exports = () => {
  return new Map([[1, 4], [2, 5], [3, 6]]).every(it => typeof it === 'number');

};