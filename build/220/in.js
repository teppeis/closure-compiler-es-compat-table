// __proto__ in object literals: basic support
module.exports = function() {

        return { __proto__ : [] } instanceof Array
          && !({ __proto__ : null } instanceof Object);
      
};