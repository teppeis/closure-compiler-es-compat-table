// let: is block-scoped (strict mode)
module.exports = function() {

        'use strict';
        { let bar = 456; }
        return (function(){ try { bar; } catch(e) { return true; }}());
      
};