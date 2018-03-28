// Array is subclassable: Array.isArray support
module.exports = function() {
class C extends Array {}
        return Array.isArray(new C());
      
};