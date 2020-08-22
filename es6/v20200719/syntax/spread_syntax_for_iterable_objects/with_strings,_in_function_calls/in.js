// syntax / spread syntax for iterable objects / with strings, in function calls
module.exports = () => {
  return Math.max(..."1234") === 4;

};