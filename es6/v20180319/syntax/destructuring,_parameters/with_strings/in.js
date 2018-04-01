// syntax / destructuring, parameters / with strings
module.exports = function() {
  return (function([a, b, c]) {
    return a === "a" && b === "b" && c === undefined;
  })("ab");
};
