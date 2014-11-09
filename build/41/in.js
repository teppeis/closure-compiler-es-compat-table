// class: extends
module.exports = function() {

        class C extends Array {}
        return Array.isPrototypeOf(C)
          && Array.prototype.isPrototypeOf(C.prototype);
      
};