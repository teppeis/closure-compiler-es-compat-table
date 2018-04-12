// syntax / destructuring, assignment / with generic iterables
module.exports = function() {
  $jscomp.initSymbolIterator();
  var a,b,c;
  [a, b, c] = global.__createIterableObject([1, 2]);
  return a === 1 && b === 2 && c === undefined;

};