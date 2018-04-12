// syntax / for..of loops / with arrays
module.exports = function() {
  var arr = [5];
  for (var item of arr)
    return item === 5;

};