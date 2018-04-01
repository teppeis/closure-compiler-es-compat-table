// built-ins / WeakMap / WeakMap.prototype.set returns this
module.exports = function() {
var weakmap = new WeakMap();
        var key = {};
        return weakmap.set(key, 0) === weakmap;
      
};