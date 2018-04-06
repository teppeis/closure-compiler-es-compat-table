// built-ins / well-known symbols / Symbol.split
module.exports = function() {
  var O = {};
  O[Symbol.split] = function(){
    return 42;
  };
  return ''.split(O) === 42;

};