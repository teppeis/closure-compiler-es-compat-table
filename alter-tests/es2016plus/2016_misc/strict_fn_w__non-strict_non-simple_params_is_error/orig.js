module.exports = function() {
function foo(...a){}
try {
Function("function bar(...a){'use strict';}")();
} catch(e) {
return true;
}

};