// syntax / destructuring, assignment / with arrays
module.exports = () => {
  var a,b,c;
  [a, , [b], c] = [5, null, [6]];
  return a === 5 && b === 6 && c === void undefined;

};