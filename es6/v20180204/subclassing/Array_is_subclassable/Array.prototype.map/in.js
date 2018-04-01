// subclassing / Array is subclassable / Array.prototype.map
module.exports = function() {
class C extends Array {}
        var c = new C();
        return c.map(Boolean) instanceof C;
      
};