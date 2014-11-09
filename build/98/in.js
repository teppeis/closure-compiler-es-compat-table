// Map
module.exports = function() {

    var key = {};
    var map = new Map();

    map.set(key, 123);

    return map.has(key) && map.get(key) === 123 &&
           map.size === 1;
  
};