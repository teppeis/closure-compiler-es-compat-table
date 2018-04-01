// proposal (stage 1) / Object.freeze and Object.seal syntax / Sealing, function arguments
module.exports = function() {
function foo(| bar, baz |) {
          return bar + baz;
        }
        if (foo(1, 2) !== 3) return;
        try {
          foo(1, 2, 3);
        } catch (e) {
          return true;
        }
      
};