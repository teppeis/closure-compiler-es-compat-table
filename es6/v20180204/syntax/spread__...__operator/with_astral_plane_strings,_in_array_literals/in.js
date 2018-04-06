// syntax / spread (...) operator / with astral plane strings, in array literals
module.exports = function() {
  return [..."𠮷𠮶"][0] === "𠮷";

};