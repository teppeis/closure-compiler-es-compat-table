// 2016 misc / nested rest destructuring, parameters
module.exports = () => {
  return function([x, ...[y, ...z]]) {
    return x === 1 && y === 2 && z + '' === '3,4';
  }([1,2,3,4]);

};