// syntax / for..of loops / with sparse arrays
module.exports = () => {
  var arr = [,,];
  var count = 0;
  for (var item of arr)
    count += (item === void undefined);
  return count === 2;

};