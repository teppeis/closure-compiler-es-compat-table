// syntax / destructuring, parameters / with arrays
module.exports = function() {
  return (function([a, , [b], c]) {
    return a === 5 && b === 6 && c === undefined;
  })([5, null, [6]]);
};
