// misc / Updated identifier syntax / no escaped reserved words as identifiers
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var \u0061;
  try {
    eval('var v\\u0061r');
  } catch(e) {
    return true;
  }

};