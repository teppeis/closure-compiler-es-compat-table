// syntax / destructuring, parameters / with sparse arrays
module.exports = function() {
  return (function([a, , b]) {
    return a === undefined && b === undefined;
  })([, , ,]);
};
