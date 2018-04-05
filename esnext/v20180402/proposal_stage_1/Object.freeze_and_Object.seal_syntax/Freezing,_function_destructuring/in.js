// proposal (stage 1) / Object.freeze and Object.seal syntax / Freezing, function destructuring
module.exports = function() {
function foo({# bar, baz #}) {
          if (baz === 42) bar = 27;
          return bar + baz;
        }
        if (foo({ bar: 1, baz: 2 }) !== 3) return;
        try {
          foo({ bar: 1, baz: 42 });
        } catch (e) {
          return true;
        }
      
};