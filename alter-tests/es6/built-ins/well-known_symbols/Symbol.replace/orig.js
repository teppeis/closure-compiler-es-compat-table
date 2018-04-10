// built-ins / well-known symbols / Symbol.replace
module.exports = function() {
  var O = {};
  O[Symbol.replace] = function(){
    return 42;
  };
  return ''.replace(O) === 42;

};