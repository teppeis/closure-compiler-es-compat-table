// syntax / object literal extensions / computed shorthand methods
module.exports = () => {
  var x = 'y';
  return ({ [x](){ return 1 } }).y() === 1;

};