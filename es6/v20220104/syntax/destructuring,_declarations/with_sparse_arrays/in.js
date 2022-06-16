// syntax / destructuring, declarations / with sparse arrays
module.exports = () => {
  var [a, , b] = [,,,];
  return a === void undefined && b === void undefined;

};