// nested rest destructuring, parameters
module.exports = function() {
return function([x, ...[y, ...z]]) {
     return x === 1 && y === 2 && z + '' === '3,4';
     }([1,2,3,4]);
     
};