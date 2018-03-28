// well-known symbols: Symbol.match
module.exports = function() {
var O = {};
        O[Symbol.match] = function(){
          return 42;
        };
        return ''.match(O) === 42;
      
};