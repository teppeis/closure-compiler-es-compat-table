// syntax / for..of loops / with strings
module.exports = () => {
  var str = "";
  for (var item of "foo")
    str += item;
  return str === "foo";

};