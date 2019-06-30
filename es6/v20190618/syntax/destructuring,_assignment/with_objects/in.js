// syntax / destructuring, assignment / with objects
module.exports = () => {
  var c,d,e;
  ({c, x:d, e} = {c:7, x:8});
  return c === 7 && d === 8 && e === undefined;

};