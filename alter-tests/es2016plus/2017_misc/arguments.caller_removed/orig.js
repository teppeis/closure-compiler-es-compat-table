// 2017 misc / arguments.caller removed
module.exports = function() {
  return (function(){
    'use strict';
    return !Object.getOwnPropertyDescriptor(arguments,'caller');
  })();

};