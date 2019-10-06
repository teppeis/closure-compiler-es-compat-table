// syntax / destructuring, declarations / with arrays
module.exports = () => {
  var [a, , [b], c] = [5, null, [6]];
  return a === 5 && b === 6 && c === undefined;

};