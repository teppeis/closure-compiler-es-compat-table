// syntax / destructuring, assignment / with sparse arrays
module.exports = () => {
  var a, b;
  [a, , b] = [,,,];
  return a === undefined && b === undefined;

};