// Set: constructor requires new
module.exports = function() {
new Set();
        try {
          Set();
          return false;
        } catch(e) {
          return true;
        }
      
};