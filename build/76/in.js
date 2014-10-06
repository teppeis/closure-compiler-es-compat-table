// Array.prototype[Symbol.unscopables]
module.exports = function() {

    var unscopables = Array.prototype[Symbol.unscopables];
    var ns = "find,findIndex,fill,copyWithin,entries,keys,values".split(",");
    for (var i = 0; i < ns.length; i++) {
      if (!unscopables[ns[i]]) return false;
    }
    return true;
  
};