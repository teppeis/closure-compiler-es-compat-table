// syntax / destructuring, declarations / iterator closing
module.exports = () => {
  $jscomp.initSymbolIterator();
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  var [a, b] = iter;
  return closed;

};