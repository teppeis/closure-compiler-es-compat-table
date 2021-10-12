// syntax / destructuring, parameters / rest
module.exports = () => {
  return function([a, ...b], [c, ...d]) {
    return a === 3 && b instanceof Array && (b + "") === "4,5" &&
c === 6 && d instanceof Array && d.length === 0;
  }([3, 4, 5], [6]);

};