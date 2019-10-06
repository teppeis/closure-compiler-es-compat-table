// syntax / destructuring, declarations / rest
module.exports = () => {
  var [a, ...b] = [3, 4, 5];
  var [c, ...d] = [6];
  return a === 3 && b instanceof Array && (b + "") === "4,5" &&
c === 6 && d instanceof Array && d.length === 0;

};