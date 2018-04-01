// syntax / for..of loops / with generator instances
module.exports = function() {
var result = "";
        var iterable = (function*(){ yield 1; yield 2; yield 3; }());
        for (var item of iterable) {
          result += item;
        }
        return result === "123";
      
};