// syntax / destructuring, assignment / trailing commas in iterable patterns
module.exports = function() {
  var a;
  [a,] = [1];
  return a === 1;

};