// __proto__ in object literals: not a shorthand property
module.exports = function() {

        var __proto__ = [];
        return !({ __proto__ } instanceof Array);
      
};