// Set: Set[Symbol.species]
module.exports = function() {
var prop = Object.getOwnPropertyDescriptor(Set, Symbol.species);
        return 'get' in prop && Set[Symbol.species] === Set;
      
};