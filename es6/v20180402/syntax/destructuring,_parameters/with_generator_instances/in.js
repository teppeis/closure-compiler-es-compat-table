// syntax / destructuring, parameters / with generator instances
module.exports = function() {
  return (function([a, b, c]) {
    return a === 1 && b === 2 && c === undefined;
  })(
    (function*() {
      yield 1;
      yield 2;
    })()
  );
};
