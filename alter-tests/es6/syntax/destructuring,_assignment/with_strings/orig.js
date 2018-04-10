// syntax / destructuring, assignment / with strings
module.exports = function() {
  var a,b,c;
  [a, b, c] = "ab";
  return a === "a" && b === "b" && c === undefined;

};