// built-ins / well-known symbols / Symbol.search
module.exports = function() {
  var O = {};
  O[Symbol.search] = function() {
    return 42;
  };
  return "".search(O) === 42;
};
