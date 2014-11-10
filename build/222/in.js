// __proto__ in object literals: not a computed property
module.exports = function() {

        var a = "__proto__";
        return !({ [a] : [] } instanceof Array);
      
};