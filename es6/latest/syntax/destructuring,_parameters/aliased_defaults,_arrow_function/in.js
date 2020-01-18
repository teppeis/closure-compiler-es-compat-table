// syntax / destructuring, parameters / aliased defaults, arrow function
module.exports = () => {
  return ((a, {b: x = 0, c: y = 3}) => {
    return a === 1 && x === 2 && y === 3;
  })(1, {b: 2});

};