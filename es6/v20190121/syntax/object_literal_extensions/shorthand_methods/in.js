// syntax / object literal extensions / shorthand methods
module.exports = () => {
  return ({ y() { return 2; } }).y() === 2;

};