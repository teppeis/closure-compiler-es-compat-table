// syntax / spread (...) operator / with generator instances, in arrays
module.exports = function() {
var iterable = (function*(){ yield "b"; yield "c"; yield "d"; }());
        return ["a", ...iterable, "e"][3] === "d";
      
};