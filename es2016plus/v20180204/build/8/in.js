// strict fn w/ non-strict non-simple params is error
module.exports = function() {
function foo(...a){}
     try {
     Function("function bar(...a){'use strict';}")();
     } catch(e) {
     return true;
     }
     
};