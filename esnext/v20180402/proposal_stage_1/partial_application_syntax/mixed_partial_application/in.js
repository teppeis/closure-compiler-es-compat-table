// proposal (stage 1) / partial application syntax / mixed partial application
module.exports = function() {
function f(a, b, c, d) {
          return a + b + c;
        };
        var p = f(?, 'b', ...);
        return p('a', 'c', 'd') === 'abcd';
      
};