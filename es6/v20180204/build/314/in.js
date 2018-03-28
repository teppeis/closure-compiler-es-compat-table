// Set: Set.prototype isn't an instance
module.exports = function() {
new Set();
        var obj = {};
        try {
          Set.prototype.has(obj);
        }
        catch(e) {
          return true;
        }
      
};