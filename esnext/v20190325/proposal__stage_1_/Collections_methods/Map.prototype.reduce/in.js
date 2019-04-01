// proposal (stage 1) / Collections methods / Map.prototype.reduce
module.exports = () => {
  return new Map([['a', 1], ['b', 2], ['c', 3], ]).reduce(((a, b) => a + b), 1) === 7;

};