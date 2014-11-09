// const: is block-scoped (strict mode)
module.exports = function() {

        'use strict';
        { const bar = 456; }
        return (function(){ try { bar; } catch(e) { return true; }}());
      
};