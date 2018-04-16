// syntax / destructuring, declarations / with sparse arrays
module.exports = () => {
  var [a, , b] = [,,,];
  return a === undefined && b === undefined;

};