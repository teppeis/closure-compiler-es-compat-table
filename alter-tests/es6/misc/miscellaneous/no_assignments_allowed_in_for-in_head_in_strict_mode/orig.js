module.exports = function() {
'use strict';
try {
eval('for (var i = 0 in {}) {}');
}
catch(e) {
return true;
}

};