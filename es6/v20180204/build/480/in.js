// Array static methods: Array.from, generator instances
module.exports = function() {
var iterable = (function*(){ yield 1; yield 2; yield 3; }());
        return Array.from(iterable) + '' === "1,2,3";
      
};