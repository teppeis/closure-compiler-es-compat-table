// syntax / spread (...) operator / with sparse arrays, in function calls
module.exports = function() {
  var a = Array(...[,,]);
  return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";

};