// syntax / destructuring, declarations / trailing commas in iterable patterns
module.exports = () => {
  var [a,] = [1];
  return a === 1;

};