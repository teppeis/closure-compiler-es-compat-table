// block-level function declaration
module.exports = function() {

    'use strict';
    function f() { return 1; }
    {
      function f() { return 2; }
    }
    return f() === 1;
  
};