// syntax / destructuring, assignment / with strings
module.exports = () => {
  var a,b,c;
  [a, b, c] = "ab";
  return a === "a" && b === "b" && c === void undefined;

};