// misc / miscellaneous / no assignments allowed in for-in head in strict mode
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  'use strict';
  try {
    eval('for (var i = 0 in {}) {}');
  }
  catch(e) {
    return true;
  }

};