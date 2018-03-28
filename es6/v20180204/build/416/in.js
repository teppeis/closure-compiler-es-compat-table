// well-known symbols: Symbol.iterator, existence
module.exports = function() {
return "iterator" in Symbol;
      
};