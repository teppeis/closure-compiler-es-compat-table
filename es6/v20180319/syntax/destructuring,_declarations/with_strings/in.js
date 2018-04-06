// syntax / destructuring, declarations / with strings
module.exports = function() {
  var [a, b, c] = "ab";
  return a === "a" && b === "b" && c === undefined;

};