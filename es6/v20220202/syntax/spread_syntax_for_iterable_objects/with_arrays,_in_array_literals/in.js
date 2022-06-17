// syntax / spread syntax for iterable objects / with arrays, in array literals
module.exports = () => {
  return [...[1, 2, 3]][2] === 3;

};