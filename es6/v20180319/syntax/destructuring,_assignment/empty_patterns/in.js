// syntax / destructuring, assignment / empty patterns
module.exports = () => {
  [] = [1,2];
  ({} = {a:1,b:2});
  return true;

};