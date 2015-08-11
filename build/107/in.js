// let: is block-scoped (strict mode)
module.exports = function() {

        'use strict';
        let bar = 123;
        { let bar = 456; }
        return bar === 123;
      
};