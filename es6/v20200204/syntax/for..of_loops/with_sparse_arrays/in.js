// syntax / for..of loops / with sparse arrays
module.exports = () => {
  var arr = [,,];
  var count = 0;
  for (var item of arr)
    count += (item === undefined);
  return count === 2;

};