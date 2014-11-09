// Set
module.exports = function() {

    var obj = {};
    var set = new Set();

    set.add(123);
    set.add(123);

    return set.has(123) && set.size === 1;
  
};