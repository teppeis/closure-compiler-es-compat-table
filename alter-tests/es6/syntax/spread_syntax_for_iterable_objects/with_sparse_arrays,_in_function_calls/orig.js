// syntax / spread syntax for iterable objects / with sparse arrays, in function calls
module.exports = () => {
  var a = Array(...[,,]);
  return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";

};