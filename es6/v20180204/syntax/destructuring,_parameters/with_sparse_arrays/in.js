// syntax / destructuring, parameters / with sparse arrays
module.exports = () => {
  return function([a, , b]) {
    return a === undefined && b === undefined;
  }([,,,]);

};