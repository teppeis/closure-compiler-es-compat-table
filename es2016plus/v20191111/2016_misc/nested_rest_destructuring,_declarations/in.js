// 2016 misc / nested rest destructuring, declarations
module.exports = () => {
  var [x, ...[y, ...z]] = [1,2,3,4];
  return x === 1 && y === 2 && z + '' === '3,4';

};