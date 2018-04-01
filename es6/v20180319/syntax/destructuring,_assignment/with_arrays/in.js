// syntax / destructuring, assignment / with arrays
module.exports = function() {
  var a, b, c;
  [a, , [b], c] = [5, null, [6]];
  return a === 5 && b === 6 && c === undefined;
};
