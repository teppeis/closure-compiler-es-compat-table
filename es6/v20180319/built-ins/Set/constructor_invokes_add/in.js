// built-ins / Set / constructor invokes add
module.exports = function() {
var passed = false;
        var _add = Set.prototype.add;

        Set.prototype.add = function(v) {
          passed = true;
        };

        new Set([1]);
        Set.prototype.add = _add;

        return passed;
      
};