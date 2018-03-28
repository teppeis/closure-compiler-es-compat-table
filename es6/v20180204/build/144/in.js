// const: for loop statement scope (strict mode)
module.exports = function() {
'use strict';
        const baz = 1;
        for(const baz = 0; false;) {}
        return baz === 1;
      
};