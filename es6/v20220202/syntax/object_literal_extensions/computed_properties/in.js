// syntax / object literal extensions / computed properties
module.exports = () => {
  var x = 'y';
  return ({ [x]: 1 }).y === 1;

};