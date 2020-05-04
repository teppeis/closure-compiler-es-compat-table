// syntax / destructuring, parameters / with strings
module.exports = () => {
  return function([a, b, c]) {
    return a === "a" && b === "b" && c === void undefined;
  }("ab");

};