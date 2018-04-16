// syntax / destructuring, assignment / trailing commas in iterable patterns
module.exports = () => {
  var a;
  [a,] = [1];
  return a === 1;

};