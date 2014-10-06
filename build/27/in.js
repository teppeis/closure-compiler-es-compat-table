// WeakMap
module.exports = function() {

    var key1 = {};
    var weakmap = new WeakMap();

    weakmap.set(key1, 123);

    return weakmap.has(key1) && weakmap.get(key1) === 123;
  
};