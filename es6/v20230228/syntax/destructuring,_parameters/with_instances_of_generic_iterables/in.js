// syntax / destructuring, parameters / with instances of generic iterables
module.exports = () => {
  module.exports._ = Symbol.iterator;
  return function([a, b, c]) {
    return a === 1 && b === 2 && c === void undefined;
  }(Object.create(global.__createIterableObject([1, 2])));

};