// Object.prototype.__proto__: set prototype
module.exports = function() {
var o = {};
        o.__proto__ = Array.prototype;
        return o instanceof Array;
      
};