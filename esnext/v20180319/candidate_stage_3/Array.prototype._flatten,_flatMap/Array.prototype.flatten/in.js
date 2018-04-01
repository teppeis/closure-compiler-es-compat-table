// candidate (stage 3) / Array.prototype.{flatten, flatMap} / Array.prototype.flatten
module.exports = function() {
return [1, [2, 3], [4, [5, 6]]].flatten().join('') === '12345,6';
      
};