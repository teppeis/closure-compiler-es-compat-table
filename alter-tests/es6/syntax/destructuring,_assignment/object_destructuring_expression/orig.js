// syntax / destructuring, assignment / object destructuring expression
module.exports = () => {
  var a, b, obj = { a:1, b:2 };
  return ({a,b} = obj) === obj;

};