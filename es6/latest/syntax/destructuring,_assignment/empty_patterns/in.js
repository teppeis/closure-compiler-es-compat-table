// syntax / destructuring, assignment / empty patterns
module.exports = function() {
  [] = [1,2];
  ({} = {a:1,b:2});
  return true;

};