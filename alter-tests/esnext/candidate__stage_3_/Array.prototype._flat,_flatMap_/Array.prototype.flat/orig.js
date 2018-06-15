// candidate (stage 3) / Array.prototype.{flat, flatMap} / Array.prototype.flat
module.exports = () => {
  return [1, [2, 3], [4, [5, 6]]].flat().join('') === '12345,6';

};