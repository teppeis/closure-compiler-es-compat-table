// block-level function declaration
module.exports = function() {

    'use strict';
    {
      function f(){}
    }
    return typeof f === "undefined";
  
};