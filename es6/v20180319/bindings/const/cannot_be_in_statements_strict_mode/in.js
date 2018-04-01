// bindings / const / cannot be in statements (strict mode)
module.exports = function() {
'use strict';
        const bar = 1;
        try {
          Function("'use strict'; if(true) const baz = 1;")();
        } catch(e) {
          return true;
        }
      
};