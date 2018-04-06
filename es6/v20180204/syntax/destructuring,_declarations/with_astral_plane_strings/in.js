// syntax / destructuring, declarations / with astral plane strings
module.exports = function() {
  var [c] = "𠮷𠮶";
  return c === "𠮷";

};