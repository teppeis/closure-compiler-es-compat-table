// well-known symbols: Symbol.toStringTag affects existing built-ins
module.exports = function() {
var s = Symbol.toStringTag;
        var passed = true;
        [
          [Array.prototype, []],
          [String.prototype, ''],
          [arguments, arguments],
          [Function.prototype, function(){}],
          [Error.prototype, new Error()],
          [Boolean.prototype, true],
          [Number.prototype, 2],
          [Date.prototype, new Date()],
          [RegExp.prototype, /./]
        ].forEach(function(pair){
          pair[0][s] = "foo";
          passed &= (Object.prototype.toString.call(pair[1]) === "[object foo]");
          delete pair[0][s];
        });
        return passed;
      
};