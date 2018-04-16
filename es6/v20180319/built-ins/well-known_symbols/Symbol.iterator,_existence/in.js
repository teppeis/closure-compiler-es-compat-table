// built-ins / well-known symbols / Symbol.iterator, existence
module.exports = () => {
  return "iterator" in Symbol;

};