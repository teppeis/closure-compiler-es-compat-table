// syntax / destructuring, assignment / object destructuring expression
module.exports = function() {
  var a,
    b,
    obj = { a: 1, b: 2 };
  return ({ a, b } = obj) === obj;
};
