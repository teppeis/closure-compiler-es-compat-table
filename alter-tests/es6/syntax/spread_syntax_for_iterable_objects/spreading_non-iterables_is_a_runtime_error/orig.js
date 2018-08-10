// syntax / spread syntax for iterable objects / spreading non-iterables is a runtime error
module.exports = () => {
  try {
    Math.max(...2);
  } catch(e) {
    return Math.max(...[1, 2, 3]) === 3;
  }

};