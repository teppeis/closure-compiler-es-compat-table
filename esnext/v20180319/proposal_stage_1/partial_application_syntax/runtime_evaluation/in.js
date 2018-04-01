// proposal (stage 1) / partial application syntax / runtime evaluation
module.exports = function() {
var f = function() {
          throw new Error();
        };
        var p = f(?, 'b');
        f = function(a, b) {
          return a + b;
        };
        return p('a') === 'ab';
      
};