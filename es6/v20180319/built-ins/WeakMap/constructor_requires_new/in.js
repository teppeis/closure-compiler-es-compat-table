// built-ins / WeakMap / constructor requires new
module.exports = function() {
new WeakMap();
        try {
          WeakMap();
          return false;
        } catch(e) {
          return true;
        }
      
};