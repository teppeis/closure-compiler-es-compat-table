// Reflect: Reflect.setPrototypeOf
module.exports = function() {
var obj = {};
        Reflect.setPrototypeOf(obj, Array.prototype);
        return obj instanceof Array;
      
};