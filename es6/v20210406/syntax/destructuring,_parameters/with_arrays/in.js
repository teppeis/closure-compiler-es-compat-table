// syntax / destructuring, parameters / with arrays
module.exports = () => {
  return function([a, , [b], c]) {
    return a === 5 && b === 6 && c === void undefined;
  }([5, null, [6]]);

};