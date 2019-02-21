// syntax / spread syntax for iterable objects / with astral plane strings, in array literals
module.exports = () => {
  return [..."𠮷𠮶"][0] === "𠮷";

};