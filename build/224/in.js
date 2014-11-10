// __proto__ in object literals: not a shorthand method
module.exports = function() {

        return !({ __proto__(){} } instanceof Function);
      
};