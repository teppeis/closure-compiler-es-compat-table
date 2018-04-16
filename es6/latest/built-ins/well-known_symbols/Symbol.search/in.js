// built-ins / well-known symbols / Symbol.search
module.exports = () => {
  var O = {};
  O[Symbol.search] = function(){
    return 42;
  };
  return ''.search(O) === 42;

};