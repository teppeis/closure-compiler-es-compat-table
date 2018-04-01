// syntax / destructuring, declarations / in for-of loop heads
module.exports = function() {
for(var [i, j, k] of [[1,2,3]]) {
          return i === 1 && j === 2 && k === 3;
        }
      
};