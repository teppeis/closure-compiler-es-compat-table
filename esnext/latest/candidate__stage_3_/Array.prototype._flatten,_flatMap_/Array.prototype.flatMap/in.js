// candidate (stage 3) / Array.prototype.{flatten, flatMap} / Array.prototype.flatMap
module.exports = () => {
  return [{a: 1, b: 2}, {a: 3, b: 4}].flatMap(function (it) {
    return [it.a, it.b];
  }).join('') === '1234';

};