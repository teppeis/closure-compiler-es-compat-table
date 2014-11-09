// let: for-loop statement scope (strict mode)
module.exports = function() {

        'use strict';
        for(let baz = 0; false;) {}
        return (function(){ try { baz; } catch(e) { return true; }}());
      
};