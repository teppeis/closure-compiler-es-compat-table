// Updated identifier syntax: var ⸯ;
module.exports = function() {
try {
          eval('var ⸯ');
        } catch(e) {
          return true;
        }
      
};