// syntax / spread (...) operator / with sparse arrays, in array literals
module.exports = function() {
  var a = [...[,,]];
  return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";

};