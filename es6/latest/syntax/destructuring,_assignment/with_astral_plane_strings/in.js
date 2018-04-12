// syntax / destructuring, assignment / with astral plane strings
module.exports = function() {
  var c;
  [c] = "𠮷𠮶";
  return c === "𠮷";

};