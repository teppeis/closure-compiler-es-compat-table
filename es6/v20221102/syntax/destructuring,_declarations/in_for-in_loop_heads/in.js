// syntax / destructuring, declarations / in for-in loop heads
module.exports = () => {
  for(var [i, j, k] in { qux: 1 }) {
    return i === "q" && j === "u" && k === "x";
  }

};