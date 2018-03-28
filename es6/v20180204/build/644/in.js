// Updated identifier syntax: no escaped reserved words as identifiers
module.exports = function() {
var \u0061;
        try {
          eval('var v\\u0061r');
        } catch(e) {
          return true;
        }
      
};