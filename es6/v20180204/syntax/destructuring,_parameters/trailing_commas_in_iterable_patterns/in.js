// syntax / destructuring, parameters / trailing commas in iterable patterns
module.exports = () => {
  return function([a,]) {
    return a === 1;
  }([1]);

};