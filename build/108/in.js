// let: for-loop statement scope (strict mode)
module.exports = function() {

        'use strict';
        let baz = 1;
        for(let baz = 0; false; false) {}
        return baz === 1;
      
};