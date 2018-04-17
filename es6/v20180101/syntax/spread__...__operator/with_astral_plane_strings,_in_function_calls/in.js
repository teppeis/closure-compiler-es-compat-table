// syntax / spread (...) operator / with astral plane strings, in function calls
module.exports = () => {
  return Array(..."𠮷𠮶")[0] === "𠮷";

};