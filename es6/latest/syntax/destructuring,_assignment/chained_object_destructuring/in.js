// syntax / destructuring, assignment / chained object destructuring
module.exports = () => {
  var a,b,c,d;
  ({a,b} = {c,d} = {a:1,b:2,c:3,d:4});
  return a === 1 && b === 2 && c === 3 && d === 4;

};